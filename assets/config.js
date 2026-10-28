/* =====================================================================
   LabelReady Canada — platform configuration (PUBLIC values only)
   ---------------------------------------------------------------------
   This is the ONLY file you edit to take the platform live.
   It is safe to commit: the Supabase anon key is designed to be public
   and is protected by Row Level Security (see supabase/schema.sql).
   NEVER paste a Supabase service_role key or a Stripe secret key here.

   GO-LIVE — fill in the three PLACEHOLDER values below:
   1. SUPABASE_URL + SUPABASE_ANON_KEY
      Supabase dashboard → your project → Settings → API.
      Steps: see supabase/README.md.
   2. STRIPE_PAYMENT_LINK
      Stripe Dashboard → Payment Links → create a link for
      "LabelReady Canada — Label Preflight (1 SKU)", CAD 49.00, one-time.
      Paste the full https://buy.stripe.com/... URL here.
      Until this is a real link, checkout buttons automatically show the
      "payments opening soon — join the list" state and orders are saved
      as waitlist/preview entries instead of being sent to Stripe.
   ===================================================================== */
window.PLATFORM_CONFIG = {
  BUSINESS_NAME: "LabelReady Canada",
  PRODUCT_NAME: "Label Preflight (1 SKU)",
  PRICE_CAD: 49,
  PRICE_LABEL: "$49",

  /* Products sold on this platform. The first entry ("full") is the
     original product and mirrors the legacy PRODUCT_NAME / PRICE_CAD /
     PRICE_LABEL / STRIPE_PAYMENT_LINK fields, which stay in place for
     backward compatibility. Each product carries its own Stripe Payment
     Link. Until a product's stripe_link is a real
     https://buy.stripe.com/... URL (any PLACEHOLDER_* value counts as
     not live), orders for that product are saved as "waitlist" instead
     of "pending_payment" — the same behaviour a single placeholder link
     had before. */
  PRODUCTS: [
    {
      id: "full",
      name: "Label Preflight (1 SKU)",
      price_cad: 49,
      price_label: "$49",
      stripe_link: "https://buy.stripe.com/7sY6oH52YeIVa9E0JIgEg00"
    },
    {
      id: "quickcheck",
      name: "Label QuickCheck",
      price_cad: 10,
      price_label: "$10",
      // Go-live: Stripe Payment Link for "LabelReady Canada — Label
      // QuickCheck", CAD 10.00, one-time. See BUILD_NOTES_QUICKCHECK.md.
      stripe_link: "https://buy.stripe.com/7sY14n1QMbwJ2Hc9gegEg02"
    }
  ],

  SUPABASE_URL: "https://gttjpsojfqosppfwpqgn.supabase.co",           // e.g. https://abcd1234.supabase.co
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0dGpwc29qZnFvc3BwZndwcWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4MDcyNjIsImV4cCI6MjEwODM4MzI2Mn0.4oSKyOIGiRpj6TSkbjNOaMyns8StUUONGO66IGKR_2o", // long anon/public key from Supabase

  STRIPE_PAYMENT_LINK: "https://buy.stripe.com/7sY6oH52YeIVa9E0JIgEg00", // e.g. https://buy.stripe.com/...

  SUPPORT_EMAIL: "rufat.baghirov97@gmail.com",
  STORAGE_BUCKET: "artwork" // Supabase Storage bucket name (see supabase/README.md step 5)
};
