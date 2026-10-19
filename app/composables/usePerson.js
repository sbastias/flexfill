class Person {
  constructor({ 
    Id,
    FirstName, 
    LastName, 
    Primary_Occupation__c,
    AVTRRT__Lat__c,
    AVTRRT__Lon__c,
    MailingCity,
    MailingState,
    MailingCountry,
    AVTRRT__Candidate_Status__c
   }) {
    this.Id = Id,
    this.FirstName = FirstName
    this.LastName = LastName
    this.Primary_Occupation__c = Primary_Occupation__c
    this.AVTRRT__Lat__c = AVTRRT__Lat__c
    this.AVTRRT__Lon__c = AVTRRT__Lon__c
    this.MailingCity = MailingCity
    this.MailingState = MailingState
    this.MailingCountry = MailingCountry
    this.AVTRRT__Candidate_Status__c = AVTRRT__Candidate_Status__c
    this.rating = Math.round((Math.random() * 5) * 2) / 2 // random rating rounded to nearest quarter
    this.liked = false
  }


  get initials () {
    return `${this.FirstName?.[0] || ''}${this.LastName?.[0] || ''}`.toUpperCase()
  }

  get fullName () {
    return `${this.FirstName || ''} ${this.LastName || ''}`.trim()
  }

  toggleLike () {
    this.liked = !this.liked
  }
  
}

export const usePerson = () => {
  return {
    Person
  }
}