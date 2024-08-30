function generateTimeBlocks() {
    // 1. Get the current time and set up start/end times for the day
    const now = new Date(); // Get the current date and time
    const currentTime = new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: "America/Los_Angeles" });
    // Format the current time as HH:MM in PST timezone

    // Create a Date objects for 8 and 4 PM
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
    const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0);


    // Extract the hour from startTime and format it
    const startHour = startTime.getHours();
    const startHourFormatted = startHour % 12 || 12; // Convert to 12-hour format
    const startAmPm = startHour < 12 ? 'AM' : 'PM';

    // Extract the hour from endTime and format it
    const endHour = endTime.getHours();
    const endHourFormatted = endHour % 12 || 12; // Convert to 12-hour format
    const endAmPm = endHour < 12 ? 'AM' : 'PM';


    // 2. Calculate total, elapsed, and remaining time in minutes
    const totalMinutes = (endTime - startTime) / (1000 * 60);
    // Calculate the total duration of the workday in minutes

    const elapsedMinutes = Math.max(0, (new Date(now) - startTime) / (1000 * 60));
    // Calculate how many minutes have passed since the start of the workday

    const remainingMinutes = Math.max(0, totalMinutes - elapsedMinutes);
    // Calculate how many minutes are remaining in the workday

    // 3. Calculate the number of filled and remaining blocks
    const totalBlocks = 16; // Total number of blocks representing the workday

    const filledBlocks = Math.min(totalBlocks, Math.floor((elapsedMinutes / totalMinutes) * totalBlocks));
    // Calculate how many blocks should be filled based on the elapsed time

    // 4. Create an array to represent the blocks visually
    const blocks = Array(totalBlocks).fill(0).map((_, i) => i < filledBlocks ? '⣀' : '⣿');
    // Create an array of 16 elements, filling it with '⣀' for filled blocks and '⣿' for remaining blocks

    // 5. Group the blocks for visual representation
    const firstGroup = blocks.slice(0, 8).join(''); // First 8 blocks
    const secondGroup = blocks.slice(8, 10).join(''); // Next 2 blocks
    const thirdGroup = blocks.slice(10).join(''); // Last 6 blocks

    // 6. Return the formatted output string
    return `
    ${startHourFormatted} ${startAmPm} - ${endHourFormatted} ${endAmPm}   (PST: ${currentTime})
    
    | ${firstGroup} | ${secondGroup} | ${thirdGroup} |
         4hr      1hr     3hr
      `;
    // Total blocks: 16
    // Remaining: ${blocks.filter(b => b === '⣿').length}
    // Passed: ${blocks.filter(b => b === '⣀').length}
}