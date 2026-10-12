from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import sys


class UnityRequestHandler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        if path.endswith(".wasm.unityweb"):
            return "application/wasm"
        if path.endswith(".js.unityweb"):
            return "application/javascript"
        if path.endswith(".data.unityweb"):
            return "application/octet-stream"
        if path.endswith(".wasm.br"):
            return "application/wasm"
        if path.endswith(".js.br"):
            return "application/javascript"
        if path.endswith(".data.br"):
            return "application/octet-stream"
        return super().guess_type(path)

    def end_headers(self):
        request_path = self.path.split("?", 1)[0]
        if request_path.endswith(".br"):
            self.send_header("Content-Encoding", "br")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(os.path.dirname(os.path.abspath(__file__)))
server = ThreadingHTTPServer(("127.0.0.1", port), UnityRequestHandler)
print(f"Serving NN Web Model at http://localhost:{port}")
try:
    server.serve_forever()
except KeyboardInterrupt:
    pass
finally:
    server.server_close()
