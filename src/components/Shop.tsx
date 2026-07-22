import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, Search, Filter, Star, Check, ShieldCheck, 
  Truck, ArrowRight, X, Plus, Minus, Trash2, CreditCard, 
  Sparkles, Lock, Info, AlertCircle, PackageCheck, RefreshCw,
  Gift, HeartHandshake, Leaf, Heart, MessageSquare, Copy, ExternalLink,
  FileText, CheckCircle2, Phone
} from "lucide-react";
import { Product, CartItem, OrderRecord } from "../types";
import { ANXIETY_PRODUCTS } from "../data";

// Helper function to generate complete itemized WhatsApp invoice text
export const generateWhatsAppInvoiceText = (order: OrderRecord): string => {
  const itemsText = order.items
    .map(
      (it, idx) =>
        `${idx + 1}. *${it.product.name}*\n   Qty: ${it.quantity} × $${it.product.price.toFixed(2)} = *$${(
          it.product.price * it.quantity
        ).toFixed(2)}*`
    )
    .join("\n");

  return `🧾 *GLOBAL HOPE FOR ALL - OFFICIAL ORDER INVOICE*
----------------------------------------
🆔 *Order Reference:* ${order.orderId}
📅 *Order Date:* ${order.date}
👤 *Customer:* ${order.shippingDetails.name}
📧 *Email:* ${order.shippingDetails.email}
📞 *Phone:* ${order.shippingDetails.phone || "Not specified"}
📍 *Shipping Address:* ${order.shippingDetails.address}, ${order.shippingDetails.city}, ${order.shippingDetails.state} ${order.shippingDetails.zip}

🛍️ *ITEMIZED PRODUCTS ORDERED:*
${itemsText}

----------------------------------------
📊 *INVOICE BREAKDOWN:*
• *Subtotal:* $${order.subtotal.toFixed(2)}
${order.discount > 0 ? `• *Promo Discount:* -$${order.discount.toFixed(2)}\n` : ""}\
• *Shipping:* ${order.shippingCost === 0 ? "FREE (Orders > $35)" : `$${order.shippingCost.toFixed(2)}`}
• *Sales Tax (Est. 8%):* $${order.tax.toFixed(2)}
----------------------------------------
💵 *GRAND TOTAL DUE:* *$${order.total.toFixed(2)}*
💳 *Payment / Order Method:* ${order.paymentMethod}
----------------------------------------
💬 *Order Action:* Hello Global Hope Support Team! I have placed this order and am sending my complete itemized invoice to process my shipment. Thank you!`;
};

interface ShopProps {
  onNavigateToPortal?: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function Shop({ onNavigateToPortal, cart, setCart }: ShopProps) {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Selected product modal
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  // Cart drawer state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Discount code
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState<{ text: string; error: boolean } | null>(null);

  // Checkout Form
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "whatsapp"
  });

  // Target WhatsApp Support Phone
  const [targetWhatsappNumber, setTargetWhatsappNumber] = useState<string>("16624709606");
  const [copiedInvoiceToast, setCopiedInvoiceToast] = useState<boolean>(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState<boolean>(true);

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  // Calculate Cart Subtotal & Count
  const totalCartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = cartSubtotal > 35 || cartSubtotal === 0 ? 0 : 5.99;
  const discountAmount = (cartSubtotal * appliedDiscount) / 100;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08;
  const finalTotal = cartSubtotal - discountAmount + shippingCost + estimatedTax;

  // Add item to cart helper
  const handleAddToCart = (product: Product, quantityToAdd: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantityToAdd;
        return updated;
      }
      return [...prevCart, { product, quantity: quantityToAdd }];
    });
    // Open cart drawer briefly
    setIsCartOpen(true);
  };

  // Update cart item quantity
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Apply promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = promoCode.trim().toUpperCase();
    if (cleaned === "HOPE10") {
      setAppliedDiscount(10);
      setDiscountMsg({ text: "10% Hope Discount Applied!", error: false });
    } else if (cleaned === "WELCOME20") {
      setAppliedDiscount(20);
      setDiscountMsg({ text: "20% Welcome Discount Applied!", error: false });
    } else if (cleaned === "") {
      setAppliedDiscount(0);
      setDiscountMsg(null);
    } else {
      setDiscountMsg({ text: "Invalid code. Try 'HOPE10' or 'WELCOME20'", error: true });
    }
  };

  // WhatsApp Invoice Redirect Helper
  const handleRedirectToWhatsApp = (order: OrderRecord) => {
    const message = generateWhatsAppInvoiceText(order);
    const cleanNumber = targetWhatsappNumber.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanNumber || "16624709606"}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyInvoiceToClipboard = (order: OrderRecord) => {
    const text = generateWhatsAppInvoiceText(order);
    navigator.clipboard.writeText(text);
    setCopiedInvoiceToast(true);
    setTimeout(() => setCopiedInvoiceToast(false), 3000);
  };

  // Process Checkout
  const handlePlaceOrder = (e: React.FormEvent, forceWhatsAppRedirect: boolean = false) => {
    if (e) e.preventDefault();
    if (!checkoutForm.firstName || !checkoutForm.email || !checkoutForm.address) {
      alert("Please complete the required shipping fields (First Name, Email, Address).");
      return;
    }

    const pmLabel = (checkoutForm.paymentMethod === 'whatsapp' || forceWhatsAppRedirect)
      ? '📱 WhatsApp Direct Order & Invoice'
      : checkoutForm.paymentMethod === 'card'
      ? 'Credit Card (Stripe / WooCommerce)'
      : checkoutForm.paymentMethod === 'paypal'
      ? 'PayPal Express'
      : 'Apple Pay';

    const newOrder: OrderRecord = {
      orderId: `WC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingCost,
      tax: estimatedTax,
      total: finalTotal,
      shippingDetails: {
        name: `${checkoutForm.firstName} ${checkoutForm.lastName}`.trim(),
        email: checkoutForm.email,
        phone: checkoutForm.phone,
        address: checkoutForm.address,
        city: checkoutForm.city,
        state: checkoutForm.state,
        zip: checkoutForm.zip,
      },
      paymentMethod: pmLabel,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing & Pending Dispatch'
    };

    setCompletedOrder(newOrder);
    setCart([]);
    setIsCheckoutOpen(false);

    // If WhatsApp method selected or force redirected, trigger redirect to WhatsApp immediately!
    if (checkoutForm.paymentMethod === 'whatsapp' || forceWhatsAppRedirect) {
      handleRedirectToWhatsApp(newOrder);
    }
  };

  // Filter products
  const filteredProducts = ANXIETY_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(q) ||
      product.shortDescription.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      (product.ingredients && product.ingredients.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 text-left">
      
      {/* WooCommerce Header Banner */}
      <div className="relative rounded-[36px] bg-gradient-to-r from-blue-950 via-slate-900 to-teal-950 text-white p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute right-[-40px] top-[-40px] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-teal-300 border border-teal-400/30">
            <ShoppingBag className="w-4 h-4 text-teal-300" />
            <span>Official WooCommerce Wellness Store</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight leading-tight">
            Anxiety Relief & Botanical Supplements
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light">
            Evidence-grounded supplements, fast-acting amino formulas, organic botanical herbal infusions, 7lb weighted grounding lap pads, and CBT guided journals to support your nervous system health.
          </p>
          
          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>GMP & Lab Tested</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Free Shipping &gt;$35</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-teal-400 shrink-0" />
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>

        {/* Floating Cart Launcher Button */}
        <button
          id="cart-drawer-trigger-btn"
          onClick={() => setIsCartOpen(true)}
          className="absolute top-6 right-6 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-xl transition cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Cart</span>
          <span className="bg-slate-950 text-white text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">
            {totalCartItemsCount}
          </span>
        </button>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="glass-panel p-6 rounded-[28px] space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              id="shop-search-input"
              type="text"
              placeholder="Search supplements, tea, journals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 focus:bg-white border border-white/60 focus:border-teal-500 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none transition backdrop-blur-xs text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Sort By:
            </span>
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 backdrop-blur-xs cursor-pointer"
            >
              <option value="popular">Best Sellers & Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
          {["All", "Supplements", "Herbal Teas & Infusions", "Sensory & Grounding", "Journals & Workbooks"].map((cat) => (
            <button
              id={`category-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? "bg-teal-700 text-white shadow-md shadow-teal-700/20"
                  : "bg-white/40 hover:bg-white/70 text-slate-700 border border-white/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="glass-panel rounded-[28px] overflow-hidden flex flex-col justify-between hover:border-white/90 transition duration-200 shadow-md hover:shadow-xl group"
          >
            <div>
              {/* Product Image & Badge */}
              <div className="relative h-48 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setActiveProduct(product)}>
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-teal-800/90 text-white backdrop-blur-xs text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    {product.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/90 text-slate-800 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-200">
                  {product.category}
                </span>
              </div>

              {/* Product Body */}
              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal text-[11px]">({product.reviewCount} reviews)</span>
                </div>

                <h3 
                  onClick={() => setActiveProduct(product)}
                  className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-teal-700 cursor-pointer transition font-sans"
                >
                  {product.name}
                </h3>

                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
            </div>

            {/* Product Card Footer */}
            <div className="p-5 pt-0 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-slate-950 font-sans">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id={`product-details-btn-${product.id}`}
                  onClick={() => setActiveProduct(product)}
                  className="w-full bg-white/50 hover:bg-white text-slate-700 border border-white/80 font-bold py-2 rounded-xl text-xs transition cursor-pointer text-center"
                >
                  Details
                </button>
                <button
                  id={`product-add-cart-btn-${product.id}`}
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-xl text-xs transition shadow-md shadow-teal-600/15 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white/30 backdrop-blur-md rounded-[32px] border border-white/50 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No products match your search</h3>
          <p className="text-slate-500 text-xs">Try searching for keywords like "Magnesium", "CBT", or "Tea".</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="mt-2 text-xs font-bold text-teal-700 underline"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel-heavy rounded-[36px] max-w-2xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150">
            
            <button
              id="close-product-modal-btn"
              onClick={() => { setActiveProduct(null); setModalQuantity(1); }}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-white/40 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-5 h-64 md:h-full bg-slate-100 rounded-2xl overflow-hidden relative">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {activeProduct.badge && (
                  <span className="absolute top-3 left-3 bg-teal-800 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {activeProduct.badge}
                  </span>
                )}
              </div>

              <div className="md:col-span-7 space-y-4">
                <span className="text-xs font-bold text-teal-700 uppercase tracking-widest block">
                  {activeProduct.category}
                </span>

                <h2 className="text-xl md:text-2xl font-black text-slate-900 font-sans leading-tight">
                  {activeProduct.name}
                </h2>

                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-800">{activeProduct.rating}</span>
                  <span className="text-slate-400">({activeProduct.reviewCount} reviews)</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-black text-slate-950 font-sans">
                    ${activeProduct.price.toFixed(2)}
                  </span>
                  {activeProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${activeProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    In Stock & Ready to Ship
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Benefits checklist */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-xs font-bold text-slate-800">Key Health & Sensory Benefits:</h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {activeProduct.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>

            {/* Ingredients & Safety Note accordion section */}
            <div className="space-y-3 pt-4 border-t border-white/40 text-xs">
              {activeProduct.ingredients && (
                <div className="bg-white/40 p-3.5 rounded-xl border border-white/60 space-y-1">
                  <strong className="font-bold text-slate-800 block">Active Formula & Ingredients:</strong>
                  <p className="text-slate-600 leading-relaxed">{activeProduct.ingredients}</p>
                </div>
              )}

              {activeProduct.usageInstructions && (
                <div className="bg-white/40 p-3.5 rounded-xl border border-white/60 space-y-1">
                  <strong className="font-bold text-slate-800 block">Directions for Use:</strong>
                  <p className="text-slate-600 leading-relaxed">{activeProduct.usageInstructions}</p>
                </div>
              )}

              {activeProduct.safetyNote && (
                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200 space-y-1 text-amber-900">
                  <strong className="font-bold block flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Safety & Caution Guidelines:
                  </strong>
                  <p className="leading-relaxed">{activeProduct.safetyNote}</p>
                </div>
              )}
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/40">
              <div className="flex items-center gap-3 bg-white/50 border border-white/80 p-1.5 rounded-xl">
                <span className="text-xs font-bold text-slate-600 pl-2">Qty:</span>
                <button
                  onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                  className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-sm text-slate-800 w-6 text-center">{modalQuantity}</span>
                <button
                  onClick={() => setModalQuantity(modalQuantity + 1)}
                  className="w-7 h-7 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                id="modal-add-to-cart-btn"
                onClick={() => {
                  handleAddToCart(activeProduct, modalQuantity);
                  setActiveProduct(null);
                  setModalQuantity(1);
                }}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart • ${(activeProduct.price * modalQuantity).toFixed(2)}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* WOOCOMMERCE CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="glass-panel-heavy w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl relative animate-in slide-in-from-right duration-200">
            
            {/* Drawer Top */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/40 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-teal-700" />
                  <h3 className="font-extrabold text-slate-900 text-base">Your Shopping Cart</h3>
                </div>
                <button
                  id="close-cart-drawer-btn"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg bg-white/40"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Item List */}
              <div className="space-y-3 overflow-y-auto max-h-[55vh] pr-1 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 space-y-2">
                    <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">Your cart is empty</p>
                    <p className="text-xs">Explore our anxiety supplements, herbal teas, and sensory tools.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white/40 border border-white/60 p-3.5 rounded-2xl flex items-center gap-3 backdrop-blur-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-slate-800 text-xs line-clamp-1">{item.product.name}</h4>
                        <span className="text-xs font-black text-slate-900 block">
                          ${item.product.price.toFixed(2)}
                        </span>
                        
                        {/* Qty +/- */}
                        <div className="flex items-center gap-2 pt-0.5">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Drawer Bottom Summary & Checkout Trigger */}
            {cart.length > 0 && (
              <div className="border-t border-white/40 pt-4 space-y-3">
                
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. HOPE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white/50 border border-white/80 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none uppercase placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs"
                  >
                    Apply
                  </button>
                </form>

                {discountMsg && (
                  <p className={`text-[11px] font-semibold ${discountMsg.error ? 'text-red-600' : 'text-teal-800'}`}>
                    {discountMsg.text}
                  </p>
                )}

                {/* Subtotal Calculations */}
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold text-slate-800">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-teal-800 font-semibold">
                      <span>Discount ({appliedDiscount}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span className="font-semibold text-slate-800">
                      {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/30 pt-1 text-sm font-black text-slate-950">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  id="proceed-to-checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer transition hover:scale-[1.01]"
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Checkout
                </button>

                <button
                  id="whatsapp-cart-checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                    setCheckoutForm(prev => ({ ...prev, paymentMethod: "whatsapp" }));
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer transition hover:scale-[1.01]"
                >
                  <MessageSquare className="w-4 h-4 fill-current text-white" />
                  Checkout via WhatsApp & Invoice
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* WOOCOMMERCE CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel-heavy rounded-[36px] max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-150 text-left">
            
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-white/40 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b border-white/40 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-950 text-xl font-sans">WooCommerce Checkout</h3>
                  <p className="text-xs text-slate-500">Secure SSL Encrypted • Direct WhatsApp Invoice Integration</p>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => handlePlaceOrder(e, false)} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Shipping Details */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-teal-700" />
                  Shipping & Contact Information
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex"
                      value={checkoutForm.firstName}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, firstName: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Smith"
                      value={checkoutForm.lastName}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, lastName: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (662) 470-9606"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 text-[11px] font-semibold mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="123 Wellness Ave, Suite 400"
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Seattle"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="WA"
                      value={checkoutForm.state}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 text-[11px] font-semibold mb-1">ZIP Code *</label>
                    <input
                      type="text"
                      required
                      placeholder="98101"
                      value={checkoutForm.zip}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, zip: e.target.value })}
                      className="w-full bg-white/50 border border-white/80 rounded-xl px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Target WhatsApp Support Phone */}
                <div className="bg-emerald-50/80 p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-950 font-bold">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-600 fill-current" />
                      Global Hope WhatsApp Order Hotline
                    </span>
                    <span className="bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <p className="text-emerald-800 text-[11px] leading-relaxed">
                    Orders redirecting to WhatsApp dispatch an itemized, ready-to-send invoice to our official hotline number below:
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-700" />
                    <input
                      type="text"
                      value={targetWhatsappNumber}
                      onChange={(e) => setTargetWhatsappNumber(e.target.value)}
                      className="bg-white/80 border border-emerald-300 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800 w-44 focus:outline-none"
                      title="Support WhatsApp phone number"
                    />
                    <span className="text-[10px] text-emerald-700 font-semibold">(Default Hotline)</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 pt-1">
                  <label className="block text-slate-700 text-[11px] font-semibold">Payment & Order Method</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "whatsapp", label: "📱 WhatsApp Invoice", highlight: true },
                      { id: "card", label: "💳 Credit Card", highlight: false },
                      { id: "paypal", label: "🅿️ PayPal", highlight: false },
                      { id: "apple", label: "🍎 Apple Pay", highlight: false }
                    ].map((pm) => (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: pm.id })}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                          checkoutForm.paymentMethod === pm.id
                            ? pm.highlight
                              ? "bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400/50"
                              : "bg-teal-700 text-white border-teal-700 shadow-md"
                            : "bg-white/50 text-slate-700 border-white/80 hover:bg-white"
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Order Summary Sidebar */}
              <div className="md:col-span-5 bg-white/30 backdrop-blur-md p-5 rounded-2xl border border-white/50 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">Order Summary</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-xs">
                        <span className="text-slate-700 truncate max-w-[150px]">{item.quantity}x {item.product.name}</span>
                        <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/40 mt-3 pt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-teal-800 font-semibold">
                        <span>Discount:</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Tax (Est.):</span>
                      <span>${estimatedTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/40 pt-2 text-base font-black text-slate-950">
                      <span>Order Total:</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    id="whatsapp-checkout-redirect-btn"
                    type="button"
                    onClick={(e) => handlePlaceOrder(e, true)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30 transition hover:scale-[1.01]"
                  >
                    <MessageSquare className="w-4 h-4 fill-current text-white" />
                    Complete Order & Redirect to WhatsApp
                  </button>

                  <button
                    id="place-order-submit-btn"
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Standard Order • ${finalTotal.toFixed(2)}
                  </button>
                </div>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* COMPLETED ORDER RECEIPT MODAL WITH WHATSAPP INVOICE REDIRECT */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass-panel-heavy rounded-[36px] max-w-lg w-full p-6 md:p-8 space-y-5 text-center animate-in zoom-in-95 duration-200 text-left my-auto max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center shadow-md">
                <PackageCheck className="w-7 h-7" />
              </div>
              <button
                onClick={() => setCompletedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-800 bg-white/40 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                Order Placed & Invoice Ready
              </span>
              <h2 className="text-2xl font-black text-slate-950 font-sans mt-2">Order Confirmed!</h2>
              <p className="text-xs text-slate-500 mt-1">
                Order Reference: <strong className="text-slate-800 font-mono">{completedOrder.orderId}</strong>
              </p>
            </div>

            {/* WhatsApp Invoice Alert Banner */}
            <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-4 rounded-2xl shadow-md border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <MessageSquare className="w-4 h-4 fill-current text-emerald-400" />
                <span>Redirect to WhatsApp with Complete Invoice</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed font-light">
                Your order invoice has been generated. Click below to automatically launch WhatsApp with your pre-filled, itemized invoice text message to our support hotline.
              </p>
              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <button
                  id="receipt-redirect-whatsapp-btn"
                  onClick={() => handleRedirectToWhatsApp(completedOrder)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition hover:scale-[1.02]"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open WhatsApp & Send Invoice
                </button>
                <button
                  id="receipt-copy-invoice-btn"
                  onClick={() => handleCopyInvoiceToClipboard(completedOrder)}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition border border-white/20"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedInvoiceToast ? "Copied!" : "Copy Invoice"}
                </button>
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div className="bg-white/40 p-4 rounded-2xl border border-white/60 text-xs space-y-2">
              <div className="flex justify-between text-slate-600 border-b border-white/40 pb-2">
                <span>Date: <strong>{completedOrder.date}</strong></span>
                <span>Payment: <strong>{completedOrder.paymentMethod}</strong></span>
              </div>

              <div className="space-y-1.5 pt-1">
                <strong className="text-slate-800 block font-semibold">Purchased Items:</strong>
                {completedOrder.items.map((it) => (
                  <div key={it.product.id} className="flex justify-between text-slate-700">
                    <span>{it.quantity}x {it.product.name}</span>
                    <span className="font-semibold">${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/40 pt-2 flex justify-between font-black text-slate-900 text-sm">
                <span>Total Amount:</span>
                <span>${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Formatted Invoice Message Preview Collapsible */}
            <div className="bg-slate-900/90 text-slate-200 p-3.5 rounded-2xl text-left space-y-2 border border-slate-700/80">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp Invoice Text Preview
                </span>
                <button
                  onClick={() => setShowInvoicePreview(!showInvoicePreview)}
                  className="text-[10px] text-teal-300 hover:underline cursor-pointer"
                >
                  {showInvoicePreview ? "Hide" : "View Text"}
                </button>
              </div>

              {showInvoicePreview && (
                <pre className="text-[10px] font-mono whitespace-pre-wrap bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-emerald-300 max-h-40 overflow-y-auto leading-relaxed">
                  {generateWhatsAppInvoiceText(completedOrder)}
                </pre>
              )}
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed text-center">
              A confirmation email has also been sent to <strong>{completedOrder.shippingDetails.email}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                id="order-portal-btn"
                onClick={() => {
                  setCompletedOrder(null);
                  if (onNavigateToPortal) onNavigateToPortal();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider shadow-md cursor-pointer transition"
              >
                Go to Patient Portal
              </button>
              <button
                id="order-continue-shopping-btn"
                onClick={() => setCompletedOrder(null)}
                className="w-full bg-white/60 hover:bg-white text-slate-800 font-bold py-3 rounded-xl text-xs uppercase tracking-wider border border-white/80 cursor-pointer transition"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
