# 1. Library imports
import uvicorn
from fastapi import FastAPI
from input import feeling
import h5py
import numpy as np

app = FastAPI()

with h5py.File("model.h5", "r") as file:

    model = file['model_key'][:]


@app.get('/')
def index():
    return {'message': 'Hello, World'}


@app.post('/predict')
def predict_feeling(data: feeling):
    input_text = data.text

    prediction = model.predict(np.array([input_text]))

    return {
        'prediction': prediction.tolist()
    }

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
