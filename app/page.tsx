'use client';

import { useState } from 'react';

export default function Home() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState('');

  const generatePackage = async () => {
    setGenerating(true);
    setProgress(0);
    setDownloadUrl('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response stream');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            if (data.progress !== undefined) {
              setProgress(data.progress);
            }
            if (data.downloadUrl) {
              setDownloadUrl(data.downloadUrl);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#333',
          textAlign: 'center'
        }}>
          🐦 Cardinal Bird Package Generator
        </h1>
        <p style={{
          color: '#666',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          Generate 50 beautiful cardinal bird images with engaging captions and research-based hashtags
        </p>

        {!generating && !downloadUrl && (
          <button
            onClick={generatePackage}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: 'white',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Generate Package
          </button>
        )}

        {generating && (
          <div>
            <div style={{
              width: '100%',
              height: '20px',
              background: '#e0e0e0',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '15px'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '16px'
            }}>
              Generating... {progress}%
            </p>
          </div>
        )}

        {downloadUrl && (
          <div>
            <div style={{
              background: '#4caf50',
              color: 'white',
              padding: '15px',
              borderRadius: '10px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '16px'
            }}>
              ✅ Package generated successfully!
            </div>
            <a
              href={downloadUrl}
              download="cardinal_birds_package.zip"
              style={{
                display: 'block',
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '10px',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              📦 Download ZIP File
            </a>
            <button
              onClick={() => {
                setDownloadUrl('');
                setProgress(0);
              }}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                color: '#667eea',
                background: 'white',
                border: '2px solid #667eea',
                borderRadius: '10px',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              Generate Another Package
            </button>
          </div>
        )}

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '10px'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
            📦 What's included:
          </h3>
          <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>50 unique cardinal bird images</li>
            <li>50 engaging, storytelling captions</li>
            <li>Research-based hashtags for each post</li>
            <li>Ready to use for social media</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
