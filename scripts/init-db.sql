-- MorningAI 資料庫初始化腳本
-- 建立資料庫和基礎配置

-- 確保資料庫存在
SELECT 'CREATE DATABASE morningai_dev'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'morningai_dev');

-- 建立擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 建立租戶資料表
CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- 建立權限資料表
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    resource VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- 建立角色資料表
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '[]'::jsonb NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- 建立審計日誌資料表
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    trace_id VARCHAR(36) NOT NULL,
    actor VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    request_method VARCHAR(10),
    request_path VARCHAR(500),
    response_status INTEGER,
    latency_ms FLOAT,
    result VARCHAR(20) DEFAULT 'success' NOT NULL,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_is_active ON tenants(is_active);
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);
CREATE INDEX IF NOT EXISTS idx_roles_is_active ON roles(is_active);
CREATE INDEX IF NOT EXISTS idx_permissions_name ON permissions(name);
CREATE INDEX IF NOT EXISTS idx_permissions_resource_action ON permissions(resource, action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_trace_id ON audit_logs(trace_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- 插入預設權限
INSERT INTO permissions (name, display_name, description, resource, action) VALUES
('tenant.create', '建立租戶', '可以建立新的租戶', 'tenant', 'create'),
('tenant.read', '查看租戶', '可以查看租戶資訊', 'tenant', 'read'),
('tenant.update', '更新租戶', '可以更新租戶資訊', 'tenant', 'update'),
('tenant.delete', '刪除租戶', '可以刪除租戶', 'tenant', 'delete'),
('role.manage', '管理角色', '可以管理角色和權限', 'role', 'manage'),
('health.check', '健康檢查', '可以查看系統健康狀態', 'health', 'check')
ON CONFLICT (name) DO NOTHING;

-- 插入預設角色
INSERT INTO roles (name, display_name, description, permissions) VALUES
('admin', '管理員', '系統管理員，擁有所有權限', '["tenant.create", "tenant.read", "tenant.update", "tenant.delete", "role.manage", "health.check"]'::jsonb),
('manager', '管理者', '租戶管理者，可以管理租戶但不能管理角色', '["tenant.read", "tenant.update", "health.check"]'::jsonb),
('guest', '訪客', '訪客用戶，只能查看基本資訊', '["health.check"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- 插入測試租戶
INSERT INTO tenants (name, slug, description) VALUES
('MorningAI 官方', 'morningai-official', 'MorningAI 官方租戶'),
('測試租戶', 'test-tenant', '用於測試的租戶')
ON CONFLICT (slug) DO NOTHING;

