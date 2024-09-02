const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const START_HOUR = 9;  // 9 AM
const END_HOUR = 17;   // 5 PM
const TOTAL_BLOCKS = 16;

function generateTimeBlocks() {
    const now = new Date();
    const formattedDate = `${DAYS_OF_WEEK[now.getDay()]} ${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`;
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: "America/Los_Angeles" });
    
    // Set the start and end times for today
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), START_HOUR, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), END_HOUR, 0, 0);

    const totalMinutes = (endTime - startTime) / 60000;
    const elapsedMinutes = Math.max(0, (now - startTime) / 60000);
    const filledBlocks = Math.min(TOTAL_BLOCKS, Math.floor((elapsedMinutes / totalMinutes) * TOTAL_BLOCKS));

    const blocks = Array(TOTAL_BLOCKS).fill('⣿').fill('⣀', 0, filledBlocks);

    return {
        formattedDate,
        currentTime,
        blocks,
        remainingBlocks: TOTAL_BLOCKS - filledBlocks,
        passedBlocks: filledBlocks,
        startHourFormatted: START_HOUR % 12 || 12,
        startAmPm: START_HOUR < 12 ? 'AM' : 'PM',
        endHourFormatted: END_HOUR % 12 || 12,
        endAmPm: END_HOUR > 12 ? 'PM' : 'AM'  
    };
}

function updateTimeBlocks() {
    const {
        formattedDate,
        currentTime,
        blocks,
        remainingBlocks,
        passedBlocks,
        startHourFormatted,
        startAmPm,
        endHourFormatted,
        endAmPm
    } = generateTimeBlocks();

    document.getElementById('date').textContent = formattedDate;
    document.getElementById('time-info').textContent = `| PST: ${currentTime} | (${startHourFormatted} ${startAmPm} - ${endHourFormatted} ${endAmPm})`;
    
    const formattedBlocks = `|${blocks.slice(0, 8).join('')} | ${blocks.slice(8, 10).join('')} | ${blocks.slice(10).join('')}|`;
    document.getElementById('blocks').textContent = formattedBlocks;
    
    // document.getElementById('remaining-blocks').textContent = `Remaining: ${remainingBlocks}`;
    // document.getElementById('passed-blocks').textContent = `Passed: ${passedBlocks}`;

    requestAnimationFrame(() => setTimeout(updateTimeBlocks, 60000));
}

updateTimeBlocks();