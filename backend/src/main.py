#!/usr/bin/env python3
"""
Flask 應用入口文件
"""

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "message": "MorningAI API is running",
        "status": "healthy",
        "service": "morningai-api",
        "version": "1.0.0"
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "service": "morningai-api",
        "version": "1.0.0"
    })

@app.route('/api/v1/health/')
def api_health():
    return jsonify({
        "status": "healthy",
        "service": "morningai-api",
        "version": "1.0.0",
        "message": "API is running normally"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)

