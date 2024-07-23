export interface Concert {
    id: number;
    name: string;
    imageUrl: string;
    date: string;
    location: {
      name: string;
    };
    category: {
      name: string;
    };
    concertTickets: Array<{
      ticketType: {
        name: string;
        price: number;
      };
      availableSeats: number;
    }>;
  }
  
  export interface Location {
    id: number;
    name: string;
  }
  
  export interface Category {
    id: number;
    name: string;
  }
  