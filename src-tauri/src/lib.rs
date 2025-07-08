// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use reqwest::header::{
    HeaderMap, HeaderValue, ACCEPT, ACCEPT_ENCODING, ACCEPT_LANGUAGE, CONTENT_TYPE, HOST, ORIGIN,
    REFERER, USER_AGENT,
};
use serde_json::json;
use std::env;
use tauri_plugin_shell::{process::CommandEvent, ShellExt};

fn build_headers() -> HeaderMap {
    let mut headers = HeaderMap::new();
    headers.insert(HOST, HeaderValue::from_static("music.youtube.com"));
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));
    headers.insert(
        USER_AGENT,
        HeaderValue::from_static("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36 Edg/105.0.1343.42"),
    );
    headers.insert(ACCEPT, HeaderValue::from_static("*/*"));
    headers.insert(
        ORIGIN,
        HeaderValue::from_static("https://music.youtube.com"),
    );
    headers.insert(
        REFERER,
        HeaderValue::from_static("https://music.youtube.com/"),
    );
    headers.insert(ACCEPT_ENCODING, HeaderValue::from_static("gzip, deflate"));
    headers.insert(
        ACCEPT_LANGUAGE,
        HeaderValue::from_static("de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6"),
    );
    headers
}

fn yt_url(endpoint: &str) -> String {
    format!(
        "https://music.youtube.com/youtubei/v1/{}?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30",
        endpoint
    )
}

#[tauri::command]
async fn get_home() -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let base_payload = serde_json::json!({
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let local_payload = {
        let mut p = base_payload.clone();
        p["browseId"] = serde_json::json!("FEmusic_charts");
        p
    };

    let global_payload = {
        let mut p = base_payload.clone();
        p["browseId"] = serde_json::json!("FEmusic_charts");
        p["formData"] = serde_json::json!({ "selectedValues": ["ZZ"] });
        p
    };

    let req_local = client
        .post(yt_url("browse"))
        .headers(headers.clone())
        .json(&local_payload);

    let req_global = client
        .post(yt_url("browse"))
        .headers(headers)
        .json(&global_payload);

    let (res_local, res_global) = tokio::join!(req_local.send(), req_global.send());

    let data_local = res_local
        .map_err(|e| e.to_string())?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())?;

    let data_global = res_global
        .map_err(|e| e.to_string())?
        .json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())?;

    Ok(serde_json::json!({
        "local": data_local,
        "global": data_global
    }))
}

#[tauri::command]
async fn search(query: String) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let body = json!({
        "query": query,
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let res = client
        .post(yt_url("search"))
        .headers(headers)
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_album(browse_id: String) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let body = json!({
        "browseId": browse_id,
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let res = client
        .post(yt_url("browse"))
        .headers(headers)
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_playlist(browse_id: String) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let body = json!({
        "browseId": browse_id,
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let res = client
        .post(yt_url("browse"))
        .headers(headers)
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_artist(browse_id: String) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let body = serde_json::json!({
        "browseId": browse_id,
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let res = client
        .post(yt_url("browse"))
        .headers(headers)
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_queue_list(
    video_id: String,
    playlist_id: Option<String>,
) -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let final_playlist_id = playlist_id.unwrap_or_else(|| format!("RDAMVM{}", video_id));

    let body = serde_json::json!({
        "videoId": video_id,
        "playlistId": final_playlist_id,
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let res = client
        .post(yt_url("next"))
        .headers(headers)
        .json(&body)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn explore() -> Result<serde_json::Value, String> {
    let client = reqwest::Client::new();
    let headers = build_headers();

    let payload = serde_json::json!({
        "browseId": "FEmusic_moods_and_genres",
        "context": {
            "client": {
                "clientName": "WEB_REMIX",
                "clientVersion": "1.20220918"
            }
        },
        "racyCheckOk": true,
        "contentCheckOk": true
    });

    let res = client
        .post(yt_url("browse"))
        .headers(headers)
        .json(&payload)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    res.json::<serde_json::Value>()
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
async fn get_audio_url(app: tauri::AppHandle, video_id: String) -> String {
    let video_url = format!(
        "https://www.youtube.com/watch?v={}",
        video_id.trim().to_string()
    );

    let sidecar_command =
        app.shell()
            .sidecar("yt-dlp")
            .unwrap()
            .args(["-f", "bestaudio[ext=m4a]", "-g", &video_url]);

    let (mut rx, _child) = sidecar_command.spawn().unwrap();

    let mut result = String::new();

    while let Some(event) = rx.recv().await {
        if let CommandEvent::Stdout(line) = event {
            result.push_str(&String::from_utf8_lossy(&line));
        }
    }

    result.trim().to_string()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            search,
            get_album,
            get_playlist,
            get_artist,
            get_queue_list,
            get_home,
            explore,
            get_audio_url
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
