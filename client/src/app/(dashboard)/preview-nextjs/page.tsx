'use client';

const PreviewPage = () => {
  const iframeSrc = '/project';
  const downloadProject = () => {
    // Trigger download by navigating to the API route
    const link = document.createElement('a');
    link.href = '/api/download';
    link.download = 'project.zip';
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navigation Buttons */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        Below is an IFrame of a Nextjs project
        <button onClick={downloadProject}>Download Project</button>
      </div>

      {/* Iframe for Preview */}
      <iframe
        src={iframeSrc}
        style={{
          border: '1px solid #ccc',
          width: '100%',
          flexGrow: 1,
        }}
        title="Preview Frame"
      />
    </div>
  );
};

export default PreviewPage;
