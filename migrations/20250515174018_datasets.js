/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('settings', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('value');
    table.timestamps();
  })
  .createTable('permissions', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.timestamps();
  })
  .createTable('roles', (table) => {
    table.increments('id').primary();
    table.integer('permission_id');
    table.foreign('permission_id').references('id').inTable('permissions');
    table.string('name');
    table.timestamps();
  })
  .createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('username');
    table.string('email');
    table.string('mobile');
    table.string('password');
    table.timestamps();
  })
  .createTable('user_roles', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('role_id');
    table.foreign('role_id').references('id').inTable('roles');
    table.timestamps();
  })
  .createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('slug');
    table.string('name');
    table.string('image');
    table.text('description');
    table.enum('status', ['active', 'inactive']);
    table.integer('parent_id');
    table.foreign('parent_id').references('id').inTable('categories');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.timestamps();
  })
  .createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('slug');
    table.text('content');
    table.string('image');
    table.enum('status', ['active', 'inactive']);
    table.string('post_type');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('category_id');
    table.foreign('category_id').references('id').inTable('categories');
    table.integer('menu_id');
    table.foreign('menu_id').references('id').inTable('menus');
    table.string('tags');
    table.string('meta_title');
    table.string('meta_description');
    table.string('meta_keywords');
    table.string('meta_image');
    table.string('meta_url');
    table.string('meta_author');
    table.timestamps();
  })
  .createTable('menus', (table) => {
    table.increments('id').primary();
    table.integer('parent_id');
    table.foreign('parent_id').references('id').inTable('menus');
    table.string('label');
    table.string('icon');
    table.string('slug');
    table.timestamps();
  })
  .createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('description');
    table.string('price');
    table.string('image');
    table.enum('status', ['active', 'inactive']);
    table.integer('stock');
    table.integer('category_id');
    table.foreign('category_id').references('id').inTable('categories');
    table.timestamps();
  })
  .createTable('orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('product_id');
    table.foreign('product_id').references('id').inTable('products');
    table.timestamps();
  })
  .createTable('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id');
    table.foreign('order_id').references('id').inTable('orders');
    table.integer('product_id');
    table.foreign('product_id').references('id').inTable('products');
    table.integer('quantity');
    table.timestamps();
  })
  .createTable('carts', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('product_id');
    table.foreign('product_id').references('id').inTable('products');
    table.integer('quantity');
    table.timestamps();
  })
  .createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('product_id');
    table.foreign('product_id').references('id').inTable('products');
    table.integer('rating');
    table.string('comment');
    table.timestamps();
  })
  .createTable('wishlists', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('product_id');
    table.foreign('product_id').references('id').inTable('products');
    table.timestamps();
  })
  .createTable('user_addresses', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.string('name');
    table.string('mobile');
    table.string('address');
    table.string('city');
    table.string('state');
    table.string('country');
    table.string('pincode');
    table.timestamps();
  })
  .createTable('user_payments', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.string('payment_method');
    table.string('payment_status');
    table.string('transaction_id');
    table.timestamps();
  })
  .createTable('user_orders', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('order_id');
    table.foreign('order_id').references('id').inTable('orders');
    table.timestamps();
  })
  .createTable('user_reviews', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('review_id');
    table.foreign('review_id').references('id').inTable('reviews');
    table.timestamps();
  })
  .createTable('user_wishlists', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('wishlist_id');
    table.foreign('wishlist_id').references('id').inTable('wishlists');
    table.timestamps();
  })
  .createTable('user_carts', (table) => {
    table.increments('id').primary();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('cart_id');
    table.foreign('cart_id').references('id').inTable('carts');
    table.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTable('settings')
  .dropTable('permissions')
  .dropTable('roles')
  .dropTable('users')
  .dropTable('user_roles')
  .dropTable('categories')
  .dropTable('posts')
  .dropTable('menus')
  .dropTable('products')
  .dropTable('orders')
  .dropTable('order_items')
  .dropTable('carts')
  .dropTable('reviews')
  .dropTable('wishlists')
  .dropTable('user_addresses')
  .dropTable('user_payments')
  .dropTable('user_orders')
  .dropTable('user_reviews')
  .dropTable('user_wishlists')
  .dropTable('user_carts');
};
