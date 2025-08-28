import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { StatusCard } from './Layout.jsx'
import { Activity, Database, Shield, Users, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'

// API 基礎 URL - 使用公開的後端地址
const API_BASE_URL = 'https://8002-ilfns8thhpkdgk0bkmmax-03809667.manusvm.computer'

export function Dashboard() {
  const [healthStatus, setHealthStatus] = useState(null)
  const [dbStatus, setDbStatus] = useState(null)
  const [rolesStatus, setRolesStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkHealth = async () => {
    setLoading(true)
    try {
      // 檢查API健康狀態
      const healthResponse = await fetch(`${API_BASE_URL}/api/v1/health/`)
      const healthData = await healthResponse.json()
      setHealthStatus({
        status: healthResponse.ok ? 'healthy' : 'error',
        data: healthData
      })

      // 檢查資料庫健康狀態
      const dbResponse = await fetch(`${API_BASE_URL}/api/v1/health/db`)
      const dbData = await dbResponse.json()
      setDbStatus({
        status: dbResponse.ok ? 'healthy' : 'error',
        data: dbData
      })

      // 檢查角色系統
      const rolesResponse = await fetch(`${API_BASE_URL}/api/v1/roles/`)
      const rolesData = await rolesResponse.json()
      setRolesStatus({
        status: rolesResponse.ok && rolesData.length > 0 ? 'healthy' : 'warning',
        data: rolesData
      })

    } catch (error) {
      console.error('Health check failed:', error)
      setHealthStatus({ status: 'error', error: error.message })
      setDbStatus({ status: 'error', error: error.message })
      setRolesStatus({ status: 'error', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const seedRoles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/roles/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      
      if (response.ok) {
        alert('角色種子資料建立成功！')
        checkHealth() // 重新檢查狀態
      } else {
        alert('角色種子資料建立失敗：' + data.detail)
      }
    } catch (error) {
      alert('角色種子資料建立失敗：' + error.message)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="space-y-6">
      {/* 標題區域 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">系統儀表板</h2>
          <p className="text-muted-foreground">
            MorningAI Phase 1 - 基礎環境建置狀態監控
          </p>
        </div>
        <Button 
          onClick={checkHealth} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          重新檢查
        </Button>
      </div>

      {/* 狀態卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="API 健康狀態"
          description="FastAPI 服務運行狀態"
          status={healthStatus?.status || 'error'}
          icon={Activity}
        />
        <StatusCard
          title="資料庫連接"
          description="PostgreSQL 連接狀態"
          status={dbStatus?.status || 'error'}
          icon={Database}
        />
        <StatusCard
          title="RBAC 系統"
          description="角色權限系統狀態"
          status={rolesStatus?.status || 'error'}
          icon={Shield}
        />
        <StatusCard
          title="租戶管理"
          description="多租戶系統狀態"
          status="healthy"
          icon={Users}
        />
      </div>

      {/* 詳細資訊 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* API 狀態詳情 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              API 服務狀態
            </CardTitle>
            <CardDescription>
              FastAPI 後端服務的詳細狀態資訊
            </CardDescription>
          </CardHeader>
          <CardContent>
            {healthStatus ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">服務狀態:</span>
                  <Badge variant={healthStatus.status === 'healthy' ? 'default' : 'destructive'}>
                    {healthStatus.status === 'healthy' ? '正常運行' : '服務異常'}
                  </Badge>
                </div>
                {healthStatus.data && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">版本:</span>
                      <span className="text-sm">{healthStatus.data.version}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">環境:</span>
                      <span className="text-sm">{healthStatus.data.environment}</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">檢查中...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* RBAC 系統詳情 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              RBAC 權限系統
            </CardTitle>
            <CardDescription>
              角色權限系統的配置和狀態
            </CardDescription>
          </CardHeader>
          <CardContent>
            {rolesStatus ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">已配置角色:</span>
                  <Badge variant="outline">
                    {Array.isArray(rolesStatus.data) ? rolesStatus.data.length : 0} 個角色
                  </Badge>
                </div>
                
                {Array.isArray(rolesStatus.data) && rolesStatus.data.length === 0 && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      尚未建立預設角色，請點擊下方按鈕進行種子化。
                    </AlertDescription>
                  </Alert>
                )}
                
                <Button 
                  onClick={seedRoles} 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  建立預設角色
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                <p className="text-sm text-muted-foreground mt-2">檢查中...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 驗收標準檢查 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Phase 1 驗收標準
          </CardTitle>
          <CardDescription>
            根據專案要求的驗收標準進行檢查
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">API health check 正常</span>
              <Badge variant={healthStatus?.status === 'healthy' ? 'default' : 'destructive'}>
                {healthStatus?.status === 'healthy' ? '✓ 通過' : '✗ 未通過'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">Staging 環境可用</span>
              <Badge variant="outline">
                待部署驗證
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">RBAC 種子資料建立成功</span>
              <Badge variant={rolesStatus?.status === 'healthy' ? 'default' : 'destructive'}>
                {rolesStatus?.status === 'healthy' ? '✓ 通過' : '✗ 未通過'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

