from fastapi import FastAPI
from pydantic import BaseModel
# import data
import pickle
import json
import uvicorn
import numpy as np
from starlette.middleware.cors import CORSMiddleware
# import streamlit as st
import numpy as np
import re
from nltk.stem import PorterStemmer
import pickle
import nltk
from tensorflow.keras.models import load_model



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
    sentence: str




nltk.download('stopwords')
stopwords = set(nltk.corpus.stopwords.words('english'))


lg = pickle.load(open('/home/wildfire/moodflix/fastapi/MODEL.pkl','rb'))
tfidf_vectorizer = pickle.load(open('/home/wildfire/moodflix/fastapi/vectorizer.pkl','rb'))
lb = pickle.load(open('/home/wildfire/moodflix/fastapi/label_encoder.pkl','rb'))


def clean_text(text):
    stemmer = PorterStemmer()
    text = re.sub("[^a-zA-Z]", " ", text)
    text = text.lower()
    text = text.split()
    text = [stemmer.stem(word) for word in text if word not in stopwords]
    return " ".join(text)



# sentence = 'I love her so much'

# emotion , what = predict_emotion(sentence)
# print(f"{emotion} : {what}\n\n")



@appp.get('/')
def get_name():
    return {'Welcome fastapi'}

@appp.post('/feeling_predictionc')
def predict_emotion(input_text:model_input):

    cleaned_text = clean_text(input_text.sentence)
    input_vectorized = tfidf_vectorizer.transform([cleaned_text])

    # Predict emotion
    predicted_label = lg.predict(input_vectorized)[0]
    predicted_emotion = lb.inverse_transform([predicted_label])[0]
    label =  np.max(lg.predict(input_vectorized))

    return predicted_emotion
if __name__ == '__main__':
    uvicorn.run(appp, host='127.0.0.1', port=8080)