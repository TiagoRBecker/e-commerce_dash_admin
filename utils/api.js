import axios from "axios";

class Api {
  static async getProductsSearch(search) {
    const products = await axios.get(`/api/products/products?search=${search}`);
    return products.data;
  }
  static async getOrderSearch(search) {
    const orders = await axios.get(`/api/order/order?search=${search}`);
    return orders.data;
  }

  static async getProducts(pagination) {
    const products = await axios.get(`/api/products/products?pg=${pagination}`);
    return products.data;
  }

  static async getProduct(id) {
    const product = await axios.get(`/api/products/${id}`);
    return product.data;
  }

  static async getOrders() {
    const orders = await axios.get("/api/order/order");
    return orders.data;
  }

  static async getCategories() {
    const categories = await axios.get("/api/categories/categories");
    return categories.data;
  }

  static async getSalesDay() {
    const get = await axios.get("/api/stripe/day/daySales");
    return get.data;
  }

  static async getSalesMonth() {
    const get = await axios.get("/api/stripe/month/monthSales");
    return get.data;
  }

  static async getSalesYear() {
    const get = await axios.get("/api/stripe/year/yearSales");
    return get.data;
  }

  static async createProduct(data) {
    const { name, price, brand, descript, images, category, properties } = data;
    const product = await axios.post("/api/products/products", { ...data });
    return product.data;
  }

  static async uploadImage(data) {
    const upload = await axios.post("/api/products/upload", data);
    return upload.data;
  }

  static async createCategory(data) {
    const { name, properties } = data;
    const createCategory = await axios.post("/api/categories/categories", { ...data });
    return createCategory.data;
  }

  static async deleteProduct(id) {
    const delProduct = await axios.delete(`/api/products/${id}`);
    return delProduct.data;
  }

  static async deleteCategory(id) {
    const category = await axios.delete(`/api/categories/${id}`);
    return category.data;
  }

  static async updateProduct(id, data,img) {
    const { name, price, brand, descript, category, properties } = data;
    const product = await axios.post(`/api/products/${id}`, { ...data, id, img});
    return product.data;
  }

  static async updateCategory(id, data) {
    const { name, properties } = data;
    const update = await axios.put(`/api/categories/${id}`, { ...data });
    return update.data;
  }
}

export default   Api ;
