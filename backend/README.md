## Intro

This is a fastapi backend for neuronotes.

## Usage

> [!IMPORTANT]  
> MONGO DB server should be installed and setup in `.env` file
>
> Ollama must be running on localhost
>
> Spacy en_core_web_sm must be downloaded

>[!WARNING]
> Tested on Python version: **3.10.x**
---
### Dependencies
```bash
cd backend
pip install -r requirements.txt
```
> #### en_core_web_sm (for AutoTag)
```bash
python -m spacy download en_core_web_sm
```
---
### Run the server
```bash
cd backend
uvicorn app.main:app --reload
```

and go to `http://127.0.0.1:8000/docs`