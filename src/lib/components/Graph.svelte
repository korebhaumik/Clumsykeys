<script lang="ts">
	import Chart, { type ChartData, type ChartItem } from 'chart.js/auto';
	import { timeDataArr, theme } from '$lib/components/store';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	$: timeArr = $timeDataArr.map((x) => {
		return x.time;
	});
	$: wpmTimeArr = $timeDataArr.map((x) => x.wpm);
	$: rawTimeArr = $timeDataArr.map((x) => 60);

	const colorVar = {
		unhighlighted: '#848887',
		['accent-error']: '#A95406',
		['accent-main']: '#9BCD86'
	};
	$: {
		if ($theme === 'dark-forest') {
			colorVar.unhighlighted = '#848887';
			colorVar['accent-error'] = '#A95406';
			colorVar['accent-main'] = '#9BCD86';
			// console.log($timeArr);
		}
		if ($theme === 'cardboard') {
			colorVar.unhighlighted = '#989481';
			colorVar['accent-error'] = '#A95406';
			colorVar['accent-main'] = '#000';
		}
	}
	const data: ChartData = {
		// labels: ['10', '20', '30', '40', '50', '60', '70'],
		labels: $timeDataArr.map((x) => {
			return x.time;
		}),
		// xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
		// yLabels: [0,20,40,60,80,100,120],
		datasets: [
			{
				label: 'wpm',
				// label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
				data: $timeDataArr.map((x) => {
					return x.wpm;
				}),
				borderJoinStyle: 'round',
				tension: 0.375,
				fill: true,
				borderColor: colorVar['accent-main'],
				pointBackgroundColor: colorVar['accent-main'],
				pointHoverRadius: 7,
				yAxisID: 'y1'

				// backgroundColor: 'rgb(255, 99, 132)',
			},
			{
				label: 'raw',
				// label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
				// data: Array.from({ length: 15 }, () => Math.floor(Math.random() * 10) + 69),
				data: $timeDataArr.map((x) => {
					return x.raw;
				}),
				fill: true,
				// fill
				// borderColor: 'rgb(255, 99, 132)',
				borderColor: colorVar.unhighlighted,
				pointBackgroundColor: colorVar.unhighlighted,
				borderJoinStyle: 'round',
				tension: 0.375,
				pointHoverRadius: 7,
				yAxisID: 'y1'
				// backgroundColor: 'rgb(255, 99, 132)',
			},
			{
				label: 'error',
				data: $timeDataArr.map((x) => {
					if (x.incorrectChars === 0) return null;
					return x.incorrectChars;
				}),
				// data: Array.from({ length: 10 }, () => {
				// 	const value = Math.floor(Math.random() * 4);
				// 	return value === 0 ? 0 : value;
				// }),
				// fill: true,
				// borderColor: 'rgb(255, 99, 132)',
				borderColor: colorVar['accent-error'],
				borderJoinStyle: 'bevel',
				tension: 0,
				pointHoverRadius: 7,
				yAxisID: 'y2',
				borderWidth: 0,
				pointRadius: 4,
				pointBackgroundColor: colorVar['accent-error'],
				pointStyle: 'rectRot'
				// backgroundColor: 'rgb(255, 99, 132)',
			}
		]
	};

	function createChart() {
		if (browser) {
			new Chart(document.getElementById('new') as HTMLCanvasElement, {
				type: 'line',
				data: data as ChartData<'line', number[], string>,
				// borderJoinStyle: 'round',
				options: {
					maintainAspectRatio: false,
					scales: {
						y1: {
							min: 0,
							ticks: {
								stepSize: 10,
								maxTicksLimit: 5,
								color: colorVar.unhighlighted,
								font: {
									family: 'Comfortaa'
								}
							},
							// max: 60
							beginAtZero: true,
							title: {
								display: true,
								text: 'Words per minute',
								font: {
									size: 14,
									// weight: 'bold'
									weight: '600',
									family: 'Comfortaa'
								}
							}
						},
						y2: {
							min: 0,
							// max: 3,
							// offset: -5,
							alignToPixels: true,
							ticks: {
								includeBounds: false,
								stepSize: 1,
								color: colorVar.unhighlighted,
								font: {
									family: 'Comfortaa'
								}
								// labelOffset: 10,
								// source: 'auto'
							},
							// max: 60
							beginAtZero: true,
							title: {
								display: true,
								text: 'Errors',
								font: {
									size: 14,
									weight: '600',
									family: 'Comfortaa'
								}
							},
							position: 'right'
						},
						x: {
							ticks: {
								stepSize: 20,
								autoSkip: true,
								maxTicksLimit: 20,
								color: colorVar.unhighlighted,
								font: {
									family: 'Comfortaa'
								},
								minRotation: 45
							}
						}
					},

					// animation: false,
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							intersect: false,
							mode: 'index',
							borderColor: colorVar['accent-main'],
							borderWidth: 1,
							bodyFont: {
								family: '',
								size: 11
							},
							titleFont: {
								family: '',
								size: 14
							},
							boxPadding: 5,
							position: 'nearest',
							// boxWidth: 100,
							boxHeight: 10,
							boxWidth: 10,
							// axis: 'x',
							bodySpacing: 2,
							callbacks: {
								label: function (tooltipItem) {
									const label = tooltipItem.dataset.label || '';
									if (label) {
										const value = tooltipItem.parsed.y || 0;
										return `${label}: ${value}`;
									}
									return '';
								}
							}
						}
					}
				}
			});
		}
	}

	onMount(() => {
		createChart();
	});
</script>

<div class="h-48 max-w-5xl"><canvas id="new" /></div>
