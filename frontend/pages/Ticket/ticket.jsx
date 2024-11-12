import React from 'react'
import { useParams } from 'react-router-dom'
import TicketDisplay from '../../components/ticketpage';

export default function TicketPage() {
  const { id } = useParams();
  return (
    <div><TicketDisplay ticketId={id} userType={"agent"}/></div>
  )
}
