FROM mcr.microsoft.com/playwright:v1.38.1-focal

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install