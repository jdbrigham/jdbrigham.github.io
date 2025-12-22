let wordEntries = [];
let currentIndex = 0;
let startDate = new Date();

// Path to your CSV file
const CSV_FILE_PATH = 'WEB-MyWordScrape.csv';

// Load CSV automatically when page loads
$(document).ready(function() {
    loadCSVFromFile();
});

function loadCSVFromFile() {
    $.ajax({
        url: CSV_FILE_PATH,
        dataType: 'text',
        success: function(data) {
            console.log('CSV loaded successfully');
            console.log('Raw CSV data:', data);
            parseCSV(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error loading CSV file:', textStatus, errorThrown);
            alert('Could not load words.csv. Make sure the file exists in the same directory.');
        }
    });
}

function parseCSVLine(line) {
    // Better CSV parsing that handles quoted fields with commas
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    
    return result;
}

function parseCSV(text) {
    const lines = text.split('\n');
    wordEntries = [];

    console.log('Total lines in CSV:', lines.length);

    // Skip header row if it exists
    const startLine = lines[0].toLowerCase().includes('word') ? 1 : 0;
    console.log('Starting from line:', startLine);

    for (let i = startLine; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) {
            console.log('Skipping empty line at index:', i);
            continue;
        }

        // Use improved CSV parsing
        const parts = parseCSVLine(line);
        
        console.log('Line', i, 'parsed into', parts.length, 'parts:', parts);
        
        if (parts.length >= 3) {
            const entry = {
                word: parts[0] || '',
                pronunciation: parts[1] || '',
                partOfSpeech: parts[2] || 'noun',
                definition: parts[3] || '',
                example: parts[4] || ''
            };
            wordEntries.push(entry);
            console.log('Added entry:', entry.word);
        } else {
            console.log('Skipping line', i, '- not enough parts');
        }
    }

    console.log('Total entries parsed:', wordEntries.length);

    if (wordEntries.length > 0) {
        currentIndex = 0;
        $('#uploadSection').addClass('hidden');
        $('#navigation').removeClass('hidden');
        displayEntry(0);
    } else {
        alert('No valid entries found in CSV');
    }
}

function displayEntry(index) {
    if (index < 0 || index >= wordEntries.length) return;

    const entry = wordEntries[index];
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);

    // Update date
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];

    $('#dateNumber').text(date.getDate());
    $('#dayOfWeek').text(days[date.getDay()]);
    $('#month').text(months[date.getMonth()]);
    $('#year').text(date.getFullYear());

    // Update word info
    $('#wordTitle').text(entry.word);
    $('#pronunciation').text(entry.pronunciation);
    $('#partOfSpeech').text(entry.partOfSpeech);
    $('#definitionText').text(' : ' + entry.definition);
    $('#example').text(entry.example);

    // Update navigation
    $('#entryInfo').text(`Entry ${index + 1} of ${wordEntries.length}`);
    
    console.log('Displaying entry', index + 1, 'of', wordEntries.length);
}

function nextEntry() {
    if (currentIndex < wordEntries.length - 1) {
        currentIndex++;
        displayEntry(currentIndex);
    }
}

function previousEntry() {
    if (currentIndex > 0) {
        currentIndex--;
        displayEntry(currentIndex);
    }
}