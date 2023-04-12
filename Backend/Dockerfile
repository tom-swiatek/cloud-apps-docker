FROM python:3.10.11

WORKDIR /backend-app

COPY ./requirements.txt /backend-app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend-app/requirements.txt

COPY ./sql_app /backend-app/sql_app

CMD [ "uvicorn", "sql_app.main:app", "--host", "0.0.0.0", "--port", "8000"]