export default function (description){
  const highPriorityKeywords = ['urgent', 'down', 'critical'];
  const mediumPriorityKeywords = ['issue', 'problem', 'help'];

  const isHighPriority = highPriorityKeywords.some(keyword => 
    description.toLowerCase().includes(keyword)
  );
  const isMediumPriority = mediumPriorityKeywords.some(keyword => 
    description.toLowerCase().includes(keyword)
  )

    if (isHighPriority) {
      return 'high';
    } else if (isMediumPriority) {
      return 'medium';
    }
    return 'low';
  };