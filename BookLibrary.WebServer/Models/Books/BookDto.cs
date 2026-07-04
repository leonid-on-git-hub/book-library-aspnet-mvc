using BookLibrary.Storage.Models.Book;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace BookLibrary.WebServer.Models.Books
{
    public class BookDto
    {
        public Guid? Id { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Authors")]
        [BindProperty]
        public List<string> Authors { get; set; } = [];

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Year")]
        public DateTime Year { get; set; }

        public bool? IsAvailable { get; set; }

        public BookDto()
        {

        }

        public BookDto(Book book)
        {
            Id = book.Id;
            Name = book.Name;
            Authors = [.. book.Authors];
            Year = book.Year;
            IsAvailable = book.IsAvailable;
        }

        public Book ToDomain()
        {
            if (Id is null)
            {
                return new Book(Name, Authors, Year, IsAvailable ?? true);
            }
            else
            {
                return Book.FromPersistence((Guid)Id, Name, Authors, Year, IsAvailable ?? true);
            }
        }
    }
}
