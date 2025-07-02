import sys
from yt_dlp import YoutubeDL

def get_audio_url(video_id: str):
    url = f"https://www.youtube.com/watch?v={video_id}"
    ydl_opts = {
        "quiet": True,
        "format": "bestaudio"
    }
    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        return info["url"]

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Missing video ID", file=sys.stderr)
        sys.exit(1)
    try:
        video_id = sys.argv[1]
        print(get_audio_url(video_id))
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
