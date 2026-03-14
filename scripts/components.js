// For defining custom HTML components
class FileCard extends HTMLElement {
  constructor() {
    super();
  }
  
  // Called when element is added to DOM
  connectedCallback() {
    this.render();
  }
  
  render() {
    const filename = this.getAttribute('fileName') || 'file name';
    const sample = this.getAttribute('sample') || '1';
    const site = this.getAttribute('site') || 'undefined site';
    const timeOfDay = this.getAttribute('timeOfDay') || 'undefined time of day';
    const depth = this.getAttribute('depth') || 'undefined depth';
    const day = this.getAttribute('day') || 'undefined day';
    
    this.innerHTML = `
    <div class="file-card">
        <div class="file-name">
            <img class="file-delete" src="./styles/assets/svg/edit.svg"/>
            <span>${filename}</span>
        </div>
        <div class="file-sample">Sample ${sample}</div>
        <div class="file-tags">
            <div class="tag">${site}</div>
            <div class="tag">${timeOfDay}</div>
            <div class="tag">${depth}</div>
            <div class="tag">${day}</div>
        </div>
        <img class="file-delete" src="./styles/assets/svg/x.svg"/>
    </div>
    `;
  }
}

// Register the custom element
customElements.define('file-card', FileCard);


// To add this element to the DOM using JS