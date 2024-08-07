document.getElementById('reportForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  fetch('https://895c34bc-770c-4688-aefd-00eb4c90965a-00-3fgkploaxsdgv.riker.replit.dev/', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: generatePDFContent(data) })
  })
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  })
  .catch(error => console.error('Error:', error));
});

function generatePDFContent(data) {
  return `
    Show Title: ${data['show_title']}
    Date: ${data['date']}
    Venue: ${data['venue']}
    Director: ${data['director']}
    Written By: ${data['written_by']}
    Running Time: ${data['running_time']}
    
    Cast:
    ${data['cast']}
    
    Set:
    ${data['set']}
    
    Lighting:
    ${data['lighting']}
    
    Sound:
    ${data['sound']}
    
    Costumes:
    ${data['costumes']}
    
    DSM Notes:
    ${data['dsm']}
    
    Notes:
    ${data['notes']}
  `;
}
