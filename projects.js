document.addEventListener('DOMContentLoaded', function() {
    // Sample data with audio file URLs and download links
    let audioFiles = [
        {
            attempt: '001',
            audioUrl: 'Nethma.mp3',
            duration: '1:57',
            status: 'composed',
            size: '24.5 MB',
            price: '00.00',
            downloads: 'Available',
            downloadUrl: 'Nethma.mp3'
        },
        
    ];

    const tableBody = document.querySelector('#audioFilesTable tbody');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    let currentPage = 1;
    const rowsPerPage = 10;

    // Initialize the table
    function renderTable(data = audioFiles) {
        tableBody.innerHTML = '';
        
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = data.slice(start, end);
        
        if (paginatedData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="7" style="text-align: center;">No audio files found</td>`;
            tableBody.appendChild(row);
        } else {
            paginatedData.forEach(file => {
                const row = document.createElement('tr');
                
                // Format status badge
                let statusBadge;
                if (file.status === 'composed') {
                    statusBadge = '<span class="status-badge status-composed">Composed Only</span>';
                } else if (file.status === 'mixed') {
                    statusBadge = '<span class="status-badge status-mixed">Mixed</span>';
                } else if (file.status === 'mastered') {
                    statusBadge = '<span class="status-badge status-mastered">Mastered</span>';
                } else {
                    statusBadge = `<span class="status-badge">${file.status}</span>`;
                }
                
                // Format price display
                const priceDisplay = file.price ? `$${parseFloat(file.price).toFixed(2)}` : '-';
                
                row.innerHTML = `
                    <td>${file.attempt}.</td>
                    <td>
                        <div class="audio-player">
                            <audio controls>
                                <source src="${file.audioUrl}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </td>
                    <td>${statusBadge}</td>
                    <td>${file.size}</td>
                    <td>${priceDisplay}</td>
                    <td>${file.downloads}</td>
                    <td>
                        <a href="${file.downloadUrl}" download class="action-btn" title="Download" onclick="trackDownload('${file.attempt}')">
                            <i class="fas fa-download"></i>
                        </a>
                        <button class="action-btn" title="Share" onclick="shareFile('${file.attempt}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        
        // Update pagination info
        const totalPages = Math.ceil(data.length / rowsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Filter files based on search and status
    function filterFiles() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        
        const filteredFiles = audioFiles.filter(file => {
            const matchesSearch = 
                file.attempt.toLowerCase().includes(searchTerm) ||
                file.duration.toLowerCase().includes(searchTerm) ||
                file.size.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusValue === '' || file.status === statusValue;
            
            return matchesSearch && matchesStatus;
        });
        
        currentPage = 1; // Reset to first page when filtering
        renderTable(filteredFiles);
    }

    // Search and filter event listeners
    searchInput.addEventListener('input', filterFiles);
    statusFilter.addEventListener('change', filterFiles);

    // Pagination controls
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageBtn.addEventListener('click', function() {
        const filteredData = getFilteredData();
        const totalPages = Math.ceil(filteredData.length / rowsPerPage);
        
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    // Helper function to get currently filtered data
    function getFilteredData() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusValue = statusFilter.value;
        
        return audioFiles.filter(file => {
            const matchesSearch = 
                file.attempt.toLowerCase().includes(searchTerm) ||
                file.duration.toLowerCase().includes(searchTerm) ||
                file.size.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusValue === '' || file.status === statusValue;
            
            return matchesSearch && matchesStatus;
        });
    }

    // Function to add a new file manually
    window.addAudioFile = function(newFile) {
        // Validate the new file object
        if (!newFile.attempt || !newFile.audioUrl) {
            console.error('Attempt number and audio URL are required');
            return false;
        }
        
        // Set defaults for optional fields
        newFile.duration = newFile.duration || '0:00';
        newFile.status = newFile.status || 'composed';
        newFile.size = newFile.size || '0 MB';
        newFile.price = newFile.price || '';
        newFile.downloads = newFile.downloads || 0;
        newFile.downloadUrl = newFile.downloadUrl || newFile.audioUrl;
        
        audioFiles.unshift(newFile);
        renderTable();
        return true;
    };

    // Initialize the table
    renderTable();
});

// Track downloads (would connect to your analytics in a real app)
function trackDownload(attempt) {
    console.log(`Download initiated for file ${attempt}`);
    // In a real app, you would send this to your analytics/backend
}

function shareFile(attempt) {
    alert(`Sharing file ${attempt}`);
    // In a real app, this would open a share dialog
}