-- Esquema para Locos por la Pinotea
-- Ejecutar en el SQL Editor de Supabase

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categorías (productos y proyectos)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  price NUMERIC(12,2) NOT NULL,
  materials TEXT[],
  finishes TEXT[],
  dimensions JSONB,
  stock_type TEXT DEFAULT 'on_request' CHECK (stock_type IN ('in_stock', 'on_request')),
  stock_qty INTEGER,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(active);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);

-- Pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'approved', 'rejected', 'cancelled')),
  payment_id TEXT,
  mp_preference_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_payment ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- Solicitudes a medida
CREATE TABLE custom_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  furniture_type TEXT NOT NULL,
  environment TEXT,
  width TEXT,
  height TEXT,
  depth TEXT,
  material TEXT,
  finish TEXT,
  estimated_budget TEXT,
  desired_date TEXT,
  description TEXT,
  wants_visit BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'nueva' CHECK (status IN ('nueva', 'contactado', 'presupuestado', 'ganado', 'perdido')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE custom_request_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  custom_request_id UUID NOT NULL REFERENCES custom_requests(id) ON DELETE CASCADE,
  url TEXT NOT NULL
);

CREATE INDEX idx_custom_requests_status ON custom_requests(status);
CREATE INDEX idx_custom_requests_created ON custom_requests(created_at DESC);

-- Proyectos / trabajos realizados
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_project_images_project ON project_images(project_id);

-- Testimonios
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Configuración del negocio (una sola fila)
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  opening_hours TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  map_embed_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (Row Level Security) - habilitar y políticas según necesidad
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_request_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Lectura pública para productos activos, categorías, proyectos, testimonios, settings
CREATE POLICY "Productos activos públicos" ON products FOR SELECT USING (active = true);
CREATE POLICY "Imágenes de productos públicas" ON product_images FOR SELECT USING (true);
CREATE POLICY "Categorías activas públicas" ON categories FOR SELECT USING (active = true);
CREATE POLICY "Proyectos públicos" ON projects FOR SELECT USING (true);
CREATE POLICY "Imágenes de proyectos públicas" ON project_images FOR SELECT USING (true);
CREATE POLICY "Testimonios activos públicos" ON testimonials FOR SELECT USING (active = true);
CREATE POLICY "Settings públicos" ON settings FOR SELECT USING (true);

-- Inserción pública para pedidos (desde checkout) y custom_requests (formulario)
CREATE POLICY "Crear pedidos" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Crear solicitudes" ON custom_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Crear imágenes solicitud" ON custom_request_images FOR INSERT WITH CHECK (true);

-- Actualización de pedidos por webhook (usar service role en API)
-- El admin usará service role para CRUD completo en todas las tablas

-- Trigger updated_at para products
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- Storage bucket para imágenes (ejecutar en Dashboard o aquí si tienes permisos)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('custom-request-images', 'custom-request-images', true);
