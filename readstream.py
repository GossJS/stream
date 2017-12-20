from urllib.error import URLError, HTTPError
import urllib.request
import string


def get_stream_data(chunk_size=65536, url="http://kodaktor.ru/api2/buffer2/", N="15"):
    full_url = url + N
    req = urllib.request.Request(full_url)
    counter = 0
    keyword = {}
    try:
        with urllib.request.urlopen(req) as response:
            while True:
                d = response.read(chunk_size)
                counter += chunk_size
                d = d.decode('utf-8')

                for ch in d:
                    if ch in string.ascii_letters:
                        keyword[str(ch)] = str(counter)
                if len(keyword) == 4:
                    break

                print("Chunk size: {}\n".format(counter))

    except (URLError, HTTPError) as e:
        print("Ошибка в запросе к хосту {} ({})".format(full_url, e))

    return keyword


res = get_stream_data()
print(res)
