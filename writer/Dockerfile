FROM python:3.7-alpine
ENV FLASK_APP app.py
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD [ "flask", "run" ]
