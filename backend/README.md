## Intro

This is a fastapi backend for neuronotes.

## Usage

> [!IMPORTANT]  
> MONGO DB server should be installed and setup in `.env` file

### Dependencies
```bash
pip install fastapi uvicorn motor pydantic python-dotenv keybert
```
>#### Spacy (for autotag)
>```
>pip install spacy 
> python -m spacy download en_core_web_sm
>```


### Run the server
```bash
uvicorn app.main:app --reload
```

and go to `http://127.0.0.1:8000/docs`