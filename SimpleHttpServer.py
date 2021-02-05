import http.server
import socketserver

PORT = 3000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f'Captain server working on port: {PORT}')
    httpd.serve_forever()

# mettre les fichiers à servir dans le même répertoire que celui-ci
# lancer la commande en terminal: python -m  http.server 3000 --bind 127.0.0.1    
# lancer le fichier ci-present en custom: python3 SimpleHttpServer.py 