// Tab switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const toolPanels = document.querySelectorAll('.tool-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tool = btn.dataset.tool;

        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding panel
        toolPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(tool).classList.add('active');
    });
});

// ===== CHARACTER/WORD COUNTER =====
const counterInput = document.getElementById('counter-input');
const charCount = document.getElementById('char-count');
const charNoSpace = document.getElementById('char-no-space');
const wordCount = document.getElementById('word-count');
const lineCount = document.getElementById('line-count');
const sentenceCount = document.getElementById('sentence-count');
const paragraphCount = document.getElementById('paragraph-count');

function updateCounterStats() {
    const text = counterInput.value;

    // Character count
    charCount.textContent = text.length;

    // Characters without spaces
    charNoSpace.textContent = text.replace(/\s/g, '').length;

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = text.trim() ? words.length : 0;

    // Line count
    lineCount.textContent = text ? text.split('\n').length : 0;

    // Sentence count (rough approximation)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentenceCount.textContent = sentences.length;

    // Paragraph count
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    paragraphCount.textContent = text.trim() ? paragraphs.length : 0;
}

counterInput.addEventListener('input', updateCounterStats);

// ===== CASE CONVERTER =====
const caseInput = document.getElementById('case-input');
const caseOutput = document.getElementById('case-output');
const caseBtns = document.querySelectorAll('[data-case]');
const copyCaseBtn = document.getElementById('copy-case');

function convertCase(text, caseType) {
    switch(caseType) {
        case 'lower':
            return text.toLowerCase();

        case 'upper':
            return text.toUpperCase();

        case 'title':
            return text.replace(/\w\S*/g, word =>
                word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
            );

        case 'sentence':
            return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c =>
                c.toUpperCase()
            );

        case 'camel':
            return text
                .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                    index === 0 ? word.toLowerCase() : word.toUpperCase()
                )
                .replace(/\s+/g, '')
                .replace(/[^\w]/g, '');

        case 'pascal':
            return text
                .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
                .replace(/\s+/g, '')
                .replace(/[^\w]/g, '');

        case 'snake':
            return text
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^\w_]/g, '');

        case 'kebab':
            return text
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '');

        case 'constant':
            return text
                .trim()
                .toUpperCase()
                .replace(/\s+/g, '_')
                .replace(/[^\w_]/g, '');

        default:
            return text;
    }
}

caseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const caseType = btn.dataset.case;
        const inputText = caseInput.value;

        if (inputText.trim()) {
            caseOutput.value = convertCase(inputText, caseType);
        }
    });
});

copyCaseBtn.addEventListener('click', async () => {
    if (caseOutput.value) {
        try {
            await navigator.clipboard.writeText(caseOutput.value);
            copyCaseBtn.textContent = 'Copied!';
            copyCaseBtn.classList.add('copied');

            setTimeout(() => {
                copyCaseBtn.textContent = 'Copy';
                copyCaseBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }
});

// ===== TEXT DIFF CHECKER =====
const diffOriginal = document.getElementById('diff-original');
const diffModified = document.getElementById('diff-modified');
const compareBtn = document.getElementById('compare-btn');
const diffResults = document.getElementById('diff-results');

function simpleDiff(text1, text2) {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    const diff = [];

    let additions = 0;
    let deletions = 0;
    let unchanged = 0;

    for (let i = 0; i < maxLen; i++) {
        const line1 = lines1[i] !== undefined ? lines1[i] : null;
        const line2 = lines2[i] !== undefined ? lines2[i] : null;

        if (line1 === line2) {
            if (line1 !== null) {
                diff.push({ type: 'unchanged', content: line1 });
                unchanged++;
            }
        } else if (line1 === null) {
            diff.push({ type: 'added', content: line2 });
            additions++;
        } else if (line2 === null) {
            diff.push({ type: 'removed', content: line1 });
            deletions++;
        } else {
            diff.push({ type: 'removed', content: line1 });
            diff.push({ type: 'added', content: line2 });
            deletions++;
            additions++;
        }
    }

    return { diff, additions, deletions, unchanged };
}

function renderDiff(diffData) {
    const { diff, additions, deletions, unchanged } = diffData;

    let html = '<div class="diff-summary">';
    html += `<strong>Changes:</strong> `;
    html += `<span style="color: #065f46;">+${additions} added</span>, `;
    html += `<span style="color: #991b1b;">-${deletions} removed</span>, `;
    html += `<span style="color: #6b7280;">${unchanged} unchanged</span>`;
    html += '</div>';

    diff.forEach(line => {
        const displayContent = line.content || '(empty line)';
        const escapedContent = displayContent
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        if (line.type === 'added') {
            html += `<div class="diff-line added">+ ${escapedContent}</div>`;
        } else if (line.type === 'removed') {
            html += `<div class="diff-line removed">- ${escapedContent}</div>`;
        } else {
            html += `<div class="diff-line unchanged">  ${escapedContent}</div>`;
        }
    });

    diffResults.innerHTML = html;
    diffResults.classList.add('visible');
}

compareBtn.addEventListener('click', () => {
    const text1 = diffOriginal.value;
    const text2 = diffModified.value;

    if (text1.trim() || text2.trim()) {
        const diffData = simpleDiff(text1, text2);
        renderDiff(diffData);
    } else {
        diffResults.innerHTML = '<p style="color: #6b7280;">Please enter text in both fields to compare.</p>';
        diffResults.classList.add('visible');
    }
});

// ===== UNIT CONVERTER =====
const conversionType = document.getElementById('conversion-type');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const swapBtn = document.getElementById('swap-units');
const conversionFormula = document.getElementById('conversion-formula');

// Conversion definitions
const conversions = {
    temperature: {
        units: ['Celsius', 'Fahrenheit', 'Kelvin'],
        convert: (value, from, to) => {
            // Convert to Celsius first
            let celsius;
            if (from === 'Celsius') celsius = value;
            else if (from === 'Fahrenheit') celsius = (value - 32) * 5/9;
            else if (from === 'Kelvin') celsius = value - 273.15;

            // Convert from Celsius to target
            if (to === 'Celsius') return celsius;
            else if (to === 'Fahrenheit') return celsius * 9/5 + 32;
            else if (to === 'Kelvin') return celsius + 273.15;
        }
    },
    length: {
        units: ['Millimeters', 'Centimeters', 'Meters', 'Kilometers', 'Inches', 'Feet', 'Yards', 'Miles'],
        baseUnit: 'Meters',
        toBase: {
            'Millimeters': 0.001,
            'Centimeters': 0.01,
            'Meters': 1,
            'Kilometers': 1000,
            'Inches': 0.0254,
            'Feet': 0.3048,
            'Yards': 0.9144,
            'Miles': 1609.344
        }
    },
    weight: {
        units: ['Milligrams', 'Grams', 'Kilograms', 'Metric Tons', 'Ounces', 'Pounds', 'Stones'],
        baseUnit: 'Grams',
        toBase: {
            'Milligrams': 0.001,
            'Grams': 1,
            'Kilograms': 1000,
            'Metric Tons': 1000000,
            'Ounces': 28.3495,
            'Pounds': 453.592,
            'Stones': 6350.29
        }
    },
    volume: {
        units: ['Milliliters', 'Liters', 'Cubic Meters', 'Teaspoons', 'Tablespoons', 'Fluid Ounces', 'Cups', 'Pints', 'Quarts', 'Gallons'],
        baseUnit: 'Liters',
        toBase: {
            'Milliliters': 0.001,
            'Liters': 1,
            'Cubic Meters': 1000,
            'Teaspoons': 0.00492892,
            'Tablespoons': 0.0147868,
            'Fluid Ounces': 0.0295735,
            'Cups': 0.236588,
            'Pints': 0.473176,
            'Quarts': 0.946353,
            'Gallons': 3.78541
        }
    },
    filesize: {
        units: ['Bytes', 'Kilobytes (KB)', 'Megabytes (MB)', 'Gigabytes (GB)', 'Terabytes (TB)'],
        baseUnit: 'Bytes',
        toBase: {
            'Bytes': 1,
            'Kilobytes (KB)': 1024,
            'Megabytes (MB)': 1024 * 1024,
            'Gigabytes (GB)': 1024 * 1024 * 1024,
            'Terabytes (TB)': 1024 * 1024 * 1024 * 1024
        }
    }
};

function populateUnitSelects(type) {
    const units = conversions[type].units;

    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromUnit.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toUnit.appendChild(option2);
    });

    // Set default "to" unit to second option
    if (units.length > 1) {
        toUnit.selectedIndex = 1;
    }
}

function performConversion() {
    const type = conversionType.value;
    const value = parseFloat(fromValue.value);

    if (isNaN(value)) {
        toValue.value = '';
        conversionFormula.textContent = '';
        return;
    }

    const from = fromUnit.value;
    const to = toUnit.value;

    let result;

    if (type === 'temperature') {
        result = conversions[type].convert(value, from, to);
    } else {
        // For linear conversions (length, weight, volume, filesize)
        const toBaseMultiplier = conversions[type].toBase[from];
        const fromBaseMultiplier = conversions[type].toBase[to];
        result = value * toBaseMultiplier / fromBaseMultiplier;
    }

    toValue.value = result.toFixed(6).replace(/\.?0+$/, '');

    // Show formula
    conversionFormula.textContent = `${value} ${from} = ${toValue.value} ${to}`;
}

function swapUnits() {
    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;

    const tempValue = fromValue.value;
    fromValue.value = toValue.value;

    performConversion();
}

// Event listeners for converter
conversionType.addEventListener('change', () => {
    populateUnitSelects(conversionType.value);
    fromValue.value = '';
    toValue.value = '';
    conversionFormula.textContent = '';
});

fromValue.addEventListener('input', performConversion);
fromUnit.addEventListener('change', performConversion);
toUnit.addEventListener('change', performConversion);
swapBtn.addEventListener('click', swapUnits);

// Initialize converter
populateUnitSelects('temperature');
