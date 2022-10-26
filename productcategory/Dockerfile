FROM ubuntu:22.04 as entr_builder

RUN apt-get update && apt-get install -y build-essential curl

RUN curl http://eradman.com/entrproject/code/entr-4.7.tar.gz | tar -xz -C /tmp/

RUN cd /tmp/entr-4.7 && ./configure && make test && make install

FROM gradle:7.5.1-jdk17

COPY --from=entr_builder /usr/local/bin/entr /usr/local/bin

WORKDIR /user/src
# COPY . /work

SHELL ["/bin/bash", "-c"]

RUN echo $'gradle --stop \n\
rm -r /home/gradle/.gradle/daemon \n\
echo "Stop server ..." \n\
echo "Start server ..." \n\
gradle bootRun' > /usr/local/bin/precompile

RUN chmod +x /usr/local/bin/precompile

RUN echo 'find . -type f \( -name "*kt" \) | entr -r precompile' > /usr/local/bin/watchfile

RUN chmod +x /usr/local/bin/watchfile

EXPOSE 8080

