# LabelReady Canada — Supabase setup (click-by-click)

Do this ONCE per business. Takes ~10 minutes. No coding.

## 1. Create the project
1. Go to https://supabase.com → sign in → **New project**.
2. Name: `labelready-canada`. Region: pick the closest Canadian option offered (e.g. Canada (Central) if listed, otherwise US East).
3. Set a strong database password and SAVE it in your password manager (you rarely need it; the site never uses it).
4. Wait for the project to finish provisioning.

## 2. Run the schema
1. Left sidebar → **SQL Editor** → **New query**.
2. Paste the ENTIRE contents of `schema.sql` (this folder) → **Run**.
3. You should see "Success. No rows returned". This creates `profiles`, `orders`, status enum, row-level security, and the private `artwork` storage bucket.

## 3. Enable email auth
1. Left sidebar → **Authentication** → **Providers** → **Email**: enabled (default).
2. Decide email confirmation: **Authentication → Settings** — leaving "Confirm email" ON is fine; customers confirm via inbox before ordering.
3. **Authentication → URL Configuration**: set Site URL to the live site URL when deployed (e.g. `https://labelreadycanada.ca`) and add the same under Redirect URLs. For local testing add `http://localhost:8000`.

## 4. Paste the keys into the site
1. **Settings → API**: copy the **Project URL** and the **anon / public** key. (NEVER copy the `service_role` key into the website — it bypasses all security.)
2. Open `../assets/config.js` and replace:
   - `PLACEHOLDER_SUPABASE_URL` → your Project URL
   - `PLACEHOLDER_SUPABASE_ANON_KEY` → your anon key
3. Commit/redeploy the site. The "Preview mode" banner disappears and real accounts + orders start working. Users can only ever see their own orders (row-level security in `schema.sql`).

## 5. Storage (artwork uploads)
- The schema already created a **private** bucket named `artwork` with per-user folder policies (`artwork/<user-id>/<order-id>/<file>`).
- Phase 1 shows the upload field disabled with instructions; wiring the actual upload button is Phase 2. Files are never public; access is via signed URLs only. Disclosed retention: delete source artwork 30 days after report delivery.

## 6. Stripe payment link (when Stripe sign-in works)
1. Stripe Dashboard → **Payment Links → New**: product "LabelReady Canada — Label Preflight (1 SKU)", **CAD 49.00**, one-time.
2. After-payment confirmation page: point it to the site's `status.html` if desired.
3. Paste the `https://buy.stripe.com/...` URL into `../assets/config.js` replacing `PLACEHOLDER_STRIPE_PAYMENT_LINK`, then redeploy.
4. The site appends `client_reference_id=<order id>` to the link so payments can be matched to orders. Phase 2 adds a Stripe webhook to flip orders to `paid` automatically; until then, mark orders `paid` manually in Supabase → Table editor → `orders` after checking Stripe.
