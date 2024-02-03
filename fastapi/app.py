from fastapi import FastAPI
from pydantic import BaseModel
# import data
import pickle
import json
import uvicorn
import numpy as np
from starlette.middleware.cors import CORSMiddleware

appp = FastAPI()

origins = ["https://moodflix-7jvz.onrender.com/"]

appp.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=['*']
)


class model_input(BaseModel):
    feeling: str


# loading the saved model
# just need to input ml model file here
feeling_model = pickle.load(open('model.h5', 'rb'))


@appp.post('/feeling_prediction')
def feeling_pred(input_parameters: model_input):

    # input_data = input_parameters.json()
    # input_dictionary = json.loads(input_data)
    input_data = input_data.text()
    
    print(input_data)

    prediction = feeling_model.predict(np.array([input_data]))

    return {
        prediction
    }

if __name__ == '__main__':
    uvicorn.run(appp, host='127.0.0.1', port=8000)