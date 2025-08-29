const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  // 獲取 Git commit hash
  const commit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  const shortCommit = commit.substring(0, 7);
  
  // 生成 build ID (時間戳)
  const buildId = Date.now().toString();
  
  // 創建版本資訊
  const versionInfo = {
    version: '1.0.0',
    commit: shortCommit,
    build_id: buildId,
    build_time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  };
  
  // 確保 public 目錄存在
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // 寫入版本文件
  const versionPath = path.join(publicDir, 'version.json');
  fs.writeFileSync(versionPath, JSON.stringify(versionInfo, null, 2));
  
  console.log('✅ Version file generated:', versionPath);
  console.log('📦 Version info:', versionInfo);
  
} catch (error) {
  console.error('❌ Error generating version file:', error.message);
  
  // 如果無法獲取 Git 資訊，使用預設值
  const fallbackVersion = {
    version: '1.0.0',
    commit: 'unknown',
    build_id: Date.now().toString(),
    build_time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  };
  
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const versionPath = path.join(publicDir, 'version.json');
  fs.writeFileSync(versionPath, JSON.stringify(fallbackVersion, null, 2));
  
  console.log('⚠️ Using fallback version info:', fallbackVersion);
}

