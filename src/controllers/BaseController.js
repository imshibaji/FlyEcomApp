import fs from 'fs';
import path from 'path';
import multer from 'multer';

export default class BaseController {
  constructor(model, resource, {title = 'Resource', viewPath = 'admin', asApi = false} = {}) {
    this.model = model;
    this.resource = resource;
    this.title = title;
    this.viewPrefix = viewPath;
    this.asApi = asApi;
    this.streamClients = new Set(); // SSE clients

    // File upload config
    const storage = multer.diskStorage({
      destination: 'public/uploads/',
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
      }
    });

    this.upload = multer({ storage });
  }

  get viewPath() {
    return `${this.viewPrefix}/${this.resource}`;
  }

  // Register all standard routes including SSE
  registerRoutes(router, { prefix = '' } = {}) {
    const base = `${prefix}/${this.resource}`;

    // SSE stream
    router.get(`${base}/stream`, this.stream.bind(this)); 

    // Standard routes
    router.get(`${base}`, this.list.bind(this));
    router.get(`${base}/create`, this.create.bind(this));
    router.post(`${base}`, this.upload.single('image'), this.save.bind(this));
    router.get(`${base}/:id`, this.show.bind(this));
    router.get(`${base}/:id/edit`, this.edit.bind(this));
    router.put(`${base}/:id/update`, this.upload.single('image'), this.update.bind(this));
    router.delete(`${base}/:id/delete`, this.delete.bind(this));
  }

  // Smart render with JSON fallback
  async render(req, res, view, data) {
    const isApi = data.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;

    if (isApi) {
      return res.json({ success: true, data });
    }

    try {
      res.render(view, data);
    } catch (err) {
      if (err.message.includes('Failed to lookup view')) {
        res.json({ success: true, viewFallback: true, data });
      } else {
        throw err;
      }
    }
  }

  // File deletion helper
  deleteFileIfExists(filePath) {
    const fullPath = path.join(process.cwd(), 'public', filePath.replace(/^\/+/, ''));
    fs.access(fullPath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(fullPath, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    });
  }

  // Push data to all live SSE clients
  pushStreamData(data) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const res of this.streamClients) {
      try {
        res.write(payload);
      } catch (err) {
        this.streamClients.delete(res);
      }
    }
  }

  // Live SSE stream endpoint
  async stream(req, res) {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.flushHeaders();

    this.streamClients.add(res);

    // Optional: periodic heartbeat
    const interval = setInterval(() => {
      res.write(`data: ${JSON.stringify({ ping: new Date().toISOString() })}\n\n`);
    }, 15000);

    req.on('close', () => {
      clearInterval(interval);
      this.streamClients.delete(res);
      res.end();
    });
  }

  // CRUD methods below

  async list(req, res) {
    const records = await this.model.all();
    await this.render(req, res, `${this.viewPath}/index`, {
      [this.resource]: records,
      title: `${this.title} List`
    });
  }

  async create(req, res) {
    await this.render(req, res, `${this.viewPath}/create`, {
      title: `Create ${this.title}`
    });
  }

  async show(req, res) {
    const record = await this.model.find(req.params.id);
    await this.render(req, res, `${this.viewPath}/show`, {
      [this.resource.slice(0, -1)]: record,
      title: `${this.title} Details`
    });
  }

  async edit(req, res) {
    const record = await this.model.find(req.params.id);
    await this.render(req, res, `${this.viewPath}/edit`, {
      [this.resource.slice(0, -1)]: record,
      title: `Edit ${this.title}`
    });
  }

  async save(req, res) {
    const data = req.body;
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }

    const result = await this.model.create(data);
    const savedData = await this.model.find(result.id);
    this.pushStreamData({ event: 'create', data: savedData });

    const isApi = data.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
    if (isApi) return res.json({ success: true, message: `${this.title} created`, data: savedData });

    res.redirect(`/${this.viewPrefix}/${this.resource}`);
  }

  async update(req, res) {
    const data = req.body;
    const existing = await this.model.find(data.id);

    if (req.file) {
      if (existing?.image) this.deleteFileIfExists(existing.image);
      data.image = `/uploads/${req.file.filename}`;
    }

    const updated = await this.model.update(data.id, data);
    // if (updated.error) return res.json({ success: false, message: updated.error });
    console.log(updated);
    
    const updatedData = await this.model.find(data.id);
    this.pushStreamData({ event: 'update', data: updatedData });

    const isApi = data.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
    if (isApi) return res.json({ success: true, message: `${this.title} updated`, data: updatedData });

    res.redirect(`/${this.viewPrefix}/${this.resource}`);
  }

  async delete(req, res) {
    const existing = await this.model.find(req.params.id);
    if (existing?.image) this.deleteFileIfExists(existing.image);

    await this.model.delete(req.params.id);
    this.pushStreamData({ event: 'delete', id: req.params.id });

    const isApi = data.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
    if (isApi) return res.json({ success: true, message: `${this.title} deleted` });

    res.redirect(`/${this.viewPrefix}/${this.resource}`);
  }
}
