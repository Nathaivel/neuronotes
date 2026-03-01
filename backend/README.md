## Intro

This is a fastapi backend for neuronotes.

## Usage

> [!IMPORTANT]  
> MONGO DB server should be installed and setup in `.env` file
>
> Ollama must be running on localhost

>[!WARNING]
> Tested on Python version: **3.10.x**
---
### Dependencies
```bash
cd backend
pip install -r requirements.txt
```
---
### Run the server
```bash
cd backend
uvicorn app.main:app --reload
```

and go to `http://127.0.0.1:8000/docs`