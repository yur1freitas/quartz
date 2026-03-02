FROM buildpack-deps:trixie-curl

ARG TZ=America/Sao_Paulo
ARG LANG=pt_BR.UTF-8
ARG LOCALE=pt_BR.UTF-8
ARG LC_ALL=pt_BR.UTF-8

ENV TZ=${TZ}
ENV LANG=${LANG}
ENV LOCALE=${LOCALE}
ENV LC_ALL=${LC_ALL}

RUN apt-get update \
    && apt-get install -y starship locales locales-all \
    && rm -rf /var/lib/apt/lists/*
