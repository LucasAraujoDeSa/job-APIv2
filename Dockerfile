FROM job-backend:dependencies

ADD . /app

EXPOSE 3333

CMD ["yarn","dev"]