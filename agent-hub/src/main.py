from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="MorningAI Agent Hub",
    version="1.0.0",
    description="AI Agent Management Hub - Phase 1 Placeholder",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """根路徑"""
    return {"message": "MorningAI Agent Hub is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """健康檢查端點"""
    return {
        "status": "healthy",
        "service": "morningai-agent-hub",
        "version": "1.0.0",
        "message": "Agent Hub placeholder for Phase 1"
    }

if __name__ == "__main__":
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
    )

