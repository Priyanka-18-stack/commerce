# 🛍️ E-commerce App

## **1. Project Title**
** E-commerce App** – A responsive web application that displays products from [FakeStoreAPI](https://fakestoreapi.com) and allows users to browse, search, filter, and add items to a cart.  
Live demo:https://commerce-git-main-priyankas-projects-c93a9431.vercel.app/
---

## **2. Project Description**
This project is a **fully responsive E-commerce web application** built with **Next.js**, **React**, **Tailwind CSS**, and **React Query**.  

**Key highlights:**
- Fetches products from FakeStoreAPI to display in a grid layout.
- Allows users to **search products** by title and **filter by category**.
- Users can **view product details** in a modal.
- Add products to a **shopping cart** with quantity management.
- Responsive design ensures usability on **desktop, tablet, and mobile devices**.

**Why these technologies were used:**
- **Next.js** for server-side rendering and SEO-friendly pages.
- **React** for component-based UI.
- **Tailwind CSS** for fast, responsive, and modern styling.
- **React Query** for simplified API data fetching and caching.
- **Zustand** for lightweight state management.
.

---

##  How to Install and Run the Project

Follow these steps to get the project running **locally** on your machine:

---

### Step 1: Clone the repository
Open your terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/fake-store-app.git
cd fake-store-app
npm install
npm run dev
http://localhost:3000
npm run build
npm start

```
## How to Use the Project

Once you have the project running locally or on the live demo, here’s how to use it:

---

### **Browse Products**
- On the homepage, you will see all products displayed in a **grid layout**.
- Each product shows:
  - **Title**
  - **Description**
  - **Price**
  - **Image** (with fallback if the image is broken)

---

### **Search Products**
- Use the **search bar** at the top to filter products by their title.
- The product list updates in real-time as you type.

---

### **Filter by Category**
- Use the **category dropdown** to filter products by category.
- Default selection is **All Categories**, showing all products.

---

### **View Product Details**
- Click the **"View"** button on any product card.
- A **modal** will open showing detailed information about the product.

---

### **Add Products to Cart**
- Click the **"Add"** button to add a product to your cart.
- The cart icon at the top-right updates with the total quantity of items.

---
