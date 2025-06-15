        // Tooltip Dictionary - Edit tooltip text and toggle active/inactive here
        const tooltips = {
            'property-criteria': {
                active: true,
                text: 'Property criteria:\n• Bedrooms\n• Bathrooms\n• Garages\n• Square footage (Sq Ft)\n• Lot size\n• Year built\n• Property type'
            },
            'location-criteria': {
                active: true,
                text: 'Location criteria:\n• Safety\n• Walkability\n• School\n• Income\n• Income growth\n• Population density\n• Population growth\n• Flood risk'
            },
            'financial-criteria': {
                active: true,
                text: 'Financial criteria:\n• Price\n• Cap rate\n• Cash on cash\n• Gross yield\n• Unlevered IRR\n• Levered IRR'
            },
            'cap-rate-title': { 
                active: true, 
                text: 'Median capitalization rate across strategy properties. Cap rate = (Annual Rental Income - Operating Expenses) ÷ Purchase Price. Key profitability metric for rental properties.' 
            },
            'acceptance-rate-calculation': {
                active: true,
                text: 'Calculation: 2 accepted offers ÷ 5 resolved offers (2 accepted + 3 rejected) = 40%. The 14 offers still awaiting response are excluded from this calculation since they haven\'t been resolved yet.'
            },
            'days-to-close-calculation': {
                active: true,
                text: 'Based on 2 properties that successfully closed this month. If no properties closed this month, this would show "N/A" instead of an average.'
            },
            'closing-costs-calculation': {
                active: true,
                text: 'Based on 2 properties that successfully closed this month. Includes title fees, attorney fees, inspections, etc. If no properties closed this month, this would show "N/A" instead of an average.'
            },
            'fall-throughs-calculation': {
                active: true,
                text: '0 properties fell through this month. Count includes properties that were under contract but failed to close due to inspections, financing, appraisal issues, or other problems.'
            }
        };

        // Function to convert remaining long tooltip texts to keys
        function convertRemainingTooltips() {
            // Find all elements with long tooltip texts and convert them to keys
            document.querySelectorAll('[data-tooltip]').forEach(element => {
                const tooltipText = element.getAttribute('data-tooltip');
                
                // Skip if already using a key (short text without spaces or periods)
                if (tooltipText.length < 50 && !tooltipText.includes(' ')) return;
                
                // Find matching key in tooltips object
                const matchingKey = Object.keys(tooltips).find(key => {
                    const tooltipData = tooltips[key];
                    if (typeof tooltipData === 'object') {
                        return tooltipData.text === tooltipText;
                    } else {
                        return tooltipData === tooltipText;
                    }
                });
                
                if (matchingKey) {
                    element.setAttribute('data-tooltip', matchingKey);
                }
            });
        }
        
        // Function to convert all tooltip entries to new format (run this in console to help migrate)
        function convertTooltipsToNewFormat() {
            const converted = {};
            Object.keys(tooltips).forEach(key => {
                const value = tooltips[key];
                if (typeof value === 'string') {
                    converted[key] = {
                        active: true,
                        text: value
                    };
                } else {
                    converted[key] = value;
                }
            });
            console.log('Converted tooltips object:', JSON.stringify(converted, null, 4));
        }

        // Tab switching functionality
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetTab = this.dataset.tab;
                
                // Remove active class from all tabs and content
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                // Initialize charts if switching to market tab
                if (targetTab === 'market') {
                    initMarketCharts();
                }
                
                // Auto-select underwriting pipeline card when switching to pipeline tab
                if (targetTab === 'pipeline') {
                    // Find the underwriting pipeline card and trigger its click
                    const underwritingCard = document.querySelector('.pipeline-card[data-category="underwriting"]');
                    if (underwritingCard) {
                        // Trigger the card selection programmatically
                        underwritingCard.click();
                    }
                }
            });
        });

        // Date control functionality
        document.querySelectorAll('.segment-option').forEach(option => {
            option.addEventListener('click', function() {
                const mode = this.dataset.mode;
                const dateRangePicker = document.getElementById('dateRangePicker');
                
                // Remove active class from all options
                document.querySelectorAll('.segment-option').forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Show/hide date range picker based on mode
                if (mode === 'historical') {
                    dateRangePicker.classList.add('show');
                } else {
                    dateRangePicker.classList.remove('show');
                }
            });
        });

        // Pipeline functionality
        let selectedCategory = null;

        // Add click handlers to pipeline cards
        document.querySelectorAll('.pipeline-card').forEach(card => {
            card.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // If clicking the same card, deselect it
                if (selectedCategory === category) {
                    selectedCategory = null;
                    this.classList.remove('selected');
                    showAllRows();
                } else {
                    // Remove selection from all cards
                    document.querySelectorAll('.pipeline-card').forEach(c => c.classList.remove('selected'));
                    
                    // Select this card
                    selectedCategory = category;
                    this.classList.add('selected');
                    filterTableByCategory(category);
                }
            });
        });

        function filterTableByCategory(category) {
            const tableRows = document.querySelectorAll('#metricsTableBody tr');
            
            tableRows.forEach(row => {
                if (row.dataset.category === category) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
            
            // Show relevant KPI section
            showKpiSection(category);
        }

        function showAllRows() {
            const tableRows = document.querySelectorAll('#metricsTableBody tr');
            tableRows.forEach(row => {
                row.style.display = '';
            });
            
            // Hide all KPI sections
            hideAllKpiSections();
        }
        
        function showKpiSection(category) {
            // Hide all KPI sections first
            hideAllKpiSections();
            
            // Show the relevant KPI section
            const kpiSection = document.getElementById(category + 'Kpis');
            if (kpiSection) {
                setTimeout(() => {
                    kpiSection.classList.add('show');
                }, 50);
            }
        }
        
        function hideAllKpiSections() {
            const kpiSections = document.querySelectorAll('.kpi-section');
            kpiSections.forEach(section => {
                section.classList.remove('show');
            });
        }

        // Tooltip functionality
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        document.body.appendChild(tooltip);
        
        // Function to initialize tooltips based on active status
        function initializeTooltips() {
            document.querySelectorAll('[data-tooltip]').forEach(element => {
                const tooltipKey = element.dataset.tooltip;
                const tooltipData = tooltips[tooltipKey];
                
                // Check if tooltip should be active
                let isActive = false;
                if (tooltipData) {
                    if (typeof tooltipData === 'object') {
                        isActive = tooltipData.active;
                    } else {
                        isActive = true; // Old format assumes active
                    }
                }
                
                // Add or remove has-tooltip class based on active status
                if (isActive) {
                    element.classList.add('has-tooltip');
                } else {
                    element.classList.remove('has-tooltip');
                }
            });
        }
        
        // Initialize tooltips on page load
        initializeTooltips();
        
        // Use event delegation for tooltips
        document.addEventListener('mouseenter', function(e) {
            if (e.target.classList.contains('has-tooltip')) {
                const tooltipKey = e.target.dataset.tooltip;
                const tooltipData = tooltips[tooltipKey];
                
                // Check if tooltip is active and get text
                let tooltipText = null;
                if (tooltipData) {
                    if (typeof tooltipData === 'object') {
                        // New format with active flag
                        if (tooltipData.active) {
                            tooltipText = tooltipData.text;
                        }
                    } else {
                        // Old format - just text
                        tooltipText = tooltipData;
                    }
                } else {
                    // Fallback to key if not found
                    tooltipText = tooltipKey;
                }
                
                if (tooltipText) {
                    tooltip.textContent = tooltipText;
                    tooltip.classList.add('show');
                    
                    // Use a function to position tooltip that accounts for scroll
                    positionTooltip(e.target, tooltip);
                }
            }
        }, true);
        
        document.addEventListener('mouseleave', function(e) {
            if (e.target.classList.contains('has-tooltip')) {
                tooltip.classList.remove('show');
            }
        }, true);
        
        // Function to position tooltip that handles scrolling
        function positionTooltip(element, tooltip) {
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Position tooltip above the element, centered
            let left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top + window.scrollY - tooltipRect.height - 12;
            
            // Keep tooltip within viewport
            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < window.scrollY + 10) {
                // If no room above, show below
                top = rect.bottom + window.scrollY + 12;
            }
            
            tooltip.style.left = left + 'px';
            tooltip.style.top = top + 'px';
        }
        
        // Hide tooltip when scrolling
        window.addEventListener('scroll', function() {
            tooltip.classList.remove('show');
        });

        // Mock trend data for different metrics
        const trendData = {
            price: {
                title: 'Market Median List Price Trend',
                subtitle: 'Nashville MSA overall market movement',
                market: [465000, 468000, 472000, 478000, 482000, 485000],
                formatValue: (value) => '$' + (value/1000) + 'k',
                yMin: 460000,
                yMax: 490000
            },
            grossyield: {
                title: 'Market Median Gross Yield Trend',
                subtitle: 'Nashville MSA overall market movement',
                market: [6.8, 6.9, 7.0, 7.1, 7.2, 7.3],
                formatValue: (value) => value.toFixed(2) + '%',
                yMin: 6.5,
                yMax: 7.5
            },
            dom: {
                title: 'Market Median Days on Market Trend',
                subtitle: 'Nashville MSA overall market movement',
                market: [21, 20, 19, 18, 18, 18],
                formatValue: (value) => value + ' days',
                yMin: 16,
                yMax: 22
            },
            rentyield: {
                title: 'Market Avg Monthly Rent Yield Trend',
                subtitle: 'Nashville MSA overall market movement',
                market: [0.52, 0.54, 0.55, 0.57, 0.59, 0.60],
                formatValue: (value) => value.toFixed(2) + '%',
                yMin: 0.50,
                yMax: 0.65
            }
        };

        // Initialize Market charts
        function initMarketCharts() {
            // Only initialize if the chart canvas exists and hasn't been initialized
            const canvas = document.getElementById('opportunityTrend');
            if (canvas && !canvas.chart) {
                const ctx = canvas.getContext('2d');
                canvas.chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        datasets: [{
                            label: 'Market Trend',
                            data: trendData.price.market,
                            borderColor: '#4f46e5',
                            backgroundColor: 'rgba(79, 70, 229, 0.05)',
                            fill: true,
                            tension: 0.3,
                            pointBackgroundColor: '#4f46e5',
                            pointBorderColor: '#4f46e5',
                            pointBorderWidth: 2,
                            pointRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false }
                        },
                        scales: {
                            y: { 
                                beginAtZero: false,
                                min: trendData.price.yMin,
                                max: trendData.price.yMax,
                                grid: { color: '#f3f4f6' },
                                ticks: { 
                                    color: '#6b7280',
                                    callback: function(value) {
                                        return trendData.price.formatValue(value);
                                    }
                                }
                            },
                            x: {
                                grid: { color: '#f3f4f6' },
                                ticks: { color: '#6b7280' }
                            }
                        },
                        elements: {
                            line: {
                                borderWidth: 2
                            }
                        }
                    }
                });
            }
        }

        // Function to update chart based on selected metric
        function updateChart(metricType) {
            const canvas = document.getElementById('opportunityTrend');
            if (canvas && canvas.chart) {
                const data = trendData[metricType];
                // Update chart title and subtitle
                document.getElementById('chartTitle').querySelector('span').textContent = data.title;
                document.getElementById('chartSubtitle').querySelector('span').textContent = data.subtitle;
                // Update chart data
                canvas.chart.data.datasets[0].data = data.market;
                // Update y-axis scale and formatting
                canvas.chart.options.scales.y.min = data.yMin;
                canvas.chart.options.scales.y.max = data.yMax;
                canvas.chart.options.scales.y.ticks.callback = function(value) {
                    return data.formatValue(value);
                };
                canvas.chart.update('active');
            }
        }

        // Metric card selection functionality
        const metricCards = document.querySelectorAll('.metric-card');
        
        metricCards.forEach(card => {
            card.addEventListener('click', () => {
                // Remove selected class from all cards
                metricCards.forEach(c => c.classList.remove('selected'));
                
                // Add selected class to clicked card
                card.classList.add('selected');
                
                // Update chart based on selected metric
                const metricType = card.dataset.metric;
                updateChart(metricType);
            });
        });

        // Initialize charts for the market tab since it's active by default
        initMarketCharts();
        
        // Convert remaining tooltips to use dictionary keys
        convertRemainingTooltips();

        // Modal functionality
        const modal = document.getElementById('propertyModal');
        const modalTitle = document.querySelector('.modal-title');
        const modalClose = document.querySelector('.modal-close');

        // Add click handlers to funnel stage cards
        document.querySelectorAll('.funnel-stage-card').forEach(cardElement => {
            cardElement.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent any parent click handlers from firing
                const numberElement = this.querySelector('.funnel-stage-number');
                const labelElement = this.querySelector('.funnel-stage-label');
                
                if (numberElement) {
                    const count = numberElement.textContent.trim();
                    const stageLabel = labelElement ? labelElement.textContent.trim() : 'Properties';
                    
                    modalTitle.textContent = `${count} ${stageLabel}`;
                    showModal();
                }
            });
        });

        // Modal close functionality
        modalClose.addEventListener('click', hideModal);

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                hideModal();
            }
        });

        function showModal() {
            modal.style.display = 'flex';
            // Force a reflow to ensure display change takes effect
            modal.offsetHeight;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        }

        function hideModal() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restore body scroll
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Match transition duration
        }