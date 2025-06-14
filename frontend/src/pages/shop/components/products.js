// data/products.js
export const products = [
  {
    id: 1,
    brand: "Apple",
    name: "Apple MacBook Pro 2019 | 16\"",
    description: "RAM 16.0 GB | Memory 512 GB\nKeyboard layout Eng (English)",
    price: 749.99,
    image: "/images/macbook_pro_2019.jpg", // You'll need to add these images to your public folder
    category: "Laptop",
  },
  {
    id: 2,
    brand: "Apple",
    name: "Apple MacBook Pro 2020 | 13.3\" Touch Bar",
    description: "RAM 16.0 GB | Memory 512 GB\nKeyboard layout Eng (English)",
    price: 949.99,
    image: "/images/macbook_pro_2020.jpg",
    category: "Laptop",
  },
  {
    id: 3,
    brand: "HP",
    name: "HP EliteBook 840 G5 | i5-8350U | 14\"",
    description: "8 GB | 128 GB SSD | Backlit keyboard\nWebcam | Win 11 Pro | Silver | SE",
    price: 349.99,
    image: "/images/hp_elitebook.jpg",
    category: "Laptop",
  },
  {
    id: 4,
    brand: "Apple",
    name: "iPhone 15",
    description: "128 GB | Dual SIM | blue\nUnlocked",
    price: 449.99,
    image: "/images/iphone_15.jpg",
    category: "Phone",
  },
  {
    id: 5,
    brand: "Samsung",
    name: "Samsung Galaxy S22 Ultra 5G",
    description: "8GB | 128 GB | Dual-SIM |\nPhantom Black",
    price: 599.99, // Adjusted price to match the image, which shows 599.99 for this item, not 449.99 for the one below it.
    image: "/images/samsung_s22_ultra.jpg",
    category: "Phone",
  },
  {
    id: 6,
    brand: "Lenovo",
    name: "Lenovo Thinkpad T14 G1 | i7-10610U | 14\"",
    description: "16 GB | 512 GB SSD | Backlit keyboard\nFP | Win 11 Home | ND",
    price: 449.99,
    image: "/images/lenovo_thinkpad.jpg",
    category: "Laptop",
  },
  {
    id: 7,
    brand: "Sony",
    name: "Sony Alpha 7 III with 28-70mm zoom lens, 24.2MP* 35mm",
    description: "Full-frame Exmor R CMOS sensor\nwith 24.2 MP for BIONZ",
    price: 449.99,
    image: "/images/sony_alpha_7_iii.jpg",
    category: "Camera",
  },
  {
    id: 8,
    brand: "Samsung",
    name: "Samsung Galaxy S22 Ultra 5G", // Duplicate product as per image
    description: "8GB | 128 GB | Dual-SIM |\nPhantom Black",
    price: 449.99, // This one has a different price in the image
    image: "/images/samsung_s22_ultra.jpg", // Same image
    category: "Phone",
  },
  {
    id: 9,
    brand: "Apple",
    name: "iPad 9 (2021) | 10.2\"",
    description: "64GB | silver",
    price: 449.99,
    image: "/images/ipad_9.jpg",
    category: "Tablet",
  },
];