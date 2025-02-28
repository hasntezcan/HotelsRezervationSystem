/*
import React from 'react'
import '../styles/home.css'
import { Container, Row, Col, CardSubtitle } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'

import Subtitle from './../shared/subtitle'
import SearchBar from './../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import NewsLetter from '../shared/Newsletter'

const Home = () => {
   return <>

      <section>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="hero__content">
                     <div className="hero__subtitle d-flex align-items-center">
                        <Subtitle subtitle={'Know Before You Go'} />
                        <img src={worldImg} alt="" />
                     </div>
                     <h1>BEYLER BU PROJENİN BİTMESİ <span className='hightlight'> LAZIM</span></h1>
                     <p>
                        öyle böyle şöyledir şöyle böyle öyledir, mavi boncuk kimdeyse benim gönlüm ondadır
                     </p>
                  </div>
               </Col>

               <Col lg='2'>
                  <div className="hero__img-box">
                     <img src={heroImg} alt="" />
                  </div>
               </Col>
               <Col lg='2'>
                  <div className="hero__img-box hero__video-box mt-4">
                     <video src={heroVideo} alt="" controls />
                  </div>
               </Col>
               <Col lg='2'>
                  <div className="hero__img-box mt-5">
                     <img src={heroImg02} alt="" />
                  </div>
               </Col>

               <SearchBar />
            </Row>
         </Container>
      </section>

      <section>
         <Container>
            <Row>
               <Col lg='3'>
                  <h5 className="services__subtitle">What we serve</h5>
                  <h2 className="services__title">We offer our best services</h2>
               </Col>
               <ServiceList />
            </Row>
         </Container>
      </section>

      <section>
         <Container>
            <Row>
               <Col lg='12' className='mb-5'>
                  <Subtitle subtitle={'Explore'} />
                  <h2 className='featured__tour-title'>Our featured tours</h2>
               </Col>
               <FeaturedTourList />
            </Row>
         </Container>
      </section>

      <section>
         <Container>
            <Row>
               <Col lg='6'>
                  <div className="experience__content">
                     <Subtitle subtitle={'Experience'} />
                     <h2>With our all experience <br /> we will serve you</h2>
                     <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        <br /> Quas aliquam, hic tempora inventore suscipit unde. </p>
                  </div>

                  <div className="counter__wrapper d-flex align-items-center gap-5">
                     <div className="counter__box">
                        <span>12k+</span>
                        <h6>Successful trip</h6>
                     </div>
                     <div className="counter__box">
                        <span>2k+</span>
                        <h6>Regular clients</h6>
                     </div>
                     <div className="counter__box">
                        <span>15</span>
                        <h6>Year experience</h6>
                     </div>
                  </div>
               </Col>
               <Col lg='6'>
                  <div className="experience__img">
                     <img src={experienceImg} alt="" />
                  </div>
               </Col>
            </Row>
         </Container>
      </section>

      <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <Subtitle subtitle={'Gallery'} />
                  <h2 className="gallery__title">Visit our customers tour gallery</h2>
               </Col>
               <Col lg='12'>
                  <MasonryImagesGallery />
               </Col>
            </Row>
         </Container>
      </section>

      <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <Subtitle subtitle={'Fans Love'} />
                  <h2 className="testimonial__title">What our fans say about us</h2>
               </Col>
               <Col lg='12'>
                  <Testimonials />
               </Col>
            </Row>
         </Container>
      </section>

      <NewsLetter />
   </>
}

export default Home
*/

// src/HomePage.jsx

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Container,
  Grid,
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';

/* Example placeholder data for featured hotels */
const featuredHotels = [
  {
    id: 1,
    name: 'Grand Palace Hotel',
    city: 'New York',
    rating: 4.5,
    image: 'https://via.placeholder.com/300?text=Grand+Palace+Hotel',
  },
  {
    id: 2,
    name: 'Beachside Resort',
    city: 'Miami',
    rating: 4.2,
    image: 'https://via.placeholder.com/300?text=Beachside+Resort',
  },
  {
    id: 3,
    name: 'Mountain View Inn',
    city: 'Denver',
    rating: 4.8,
    image: 'https://via.placeholder.com/300?text=Mountain+View+Inn',
  },
];

/* Example placeholder data for popular destinations */
const popularDestinations = [
  {
    id: 1,
    label: 'Paris',
    image: 'https://via.placeholder.com/200?text=Paris',
  },
  {
    id: 2,
    label: 'London',
    image: 'https://via.placeholder.com/200?text=London',
  },
  {
    id: 3,
    label: 'Tokyo',
    image: 'https://via.placeholder.com/200?text=Tokyo',
  },
];

const HomePage = () => {
  // States for search form
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState('');

  // Handle search (could call an API with these parameters)
  const handleSearch = () => {
    console.log('Searching for hotels', {
      location,
      checkInDate,
      checkOutDate,
      guests
    });
    // Implement your reservation system logic (API call, navigation, etc.)
  };

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* =================== APP BAR (Üst Menü) =================== */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel Reservation
          </Typography>
          {/* Örnek butonlar */}
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>

      {/* ================= HERO SECTION ================== */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage:
            'url("https://via.placeholder.com/1400x600?text=Hotel+Banner")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 400, md: 500 },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#fff',
              mb: 2,
              textShadow: '1px 2px 4px rgba(0,0,0,0.6)',
            }}
          >
            Find Your Perfect Getaway
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#fff',
              mb: 4,
              textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
            }}
          >
            Explore top-rated hotels, resorts, and destinations around the world!
          </Typography>

          {/* Search widget */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 3,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              maxWidth: 800,
            }}
          >
            <TextField
              label="Location"
              variant="outlined"
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ flex: 1, minWidth: 150 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check-in"
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ minWidth: 150 }} />
                )}
              />
              <DatePicker
                label="Check-out"
                value={checkOutDate}
                onChange={(newValue) => setCheckOutDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ minWidth: 150 }} />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Guests"
              variant="outlined"
              size="small"
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              endIcon={<ArrowForwardIosIcon />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ============ FEATURED HOTELS SECTION ============ */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Featured Hotels
        </Typography>
        <Grid container spacing={3}>
          {featuredHotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel.id}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={hotel.image}
                  alt={hotel.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.city}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating
                      name="read-only"
                      value={hotel.rating}
                      precision={0.5}
                      readOnly
                      icon={<StarIcon fontSize="inherit" />}
                      emptyIcon={
                        <StarIcon fontSize="inherit" style={{ opacity: 0.4 }} />
                      }
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {hotel.rating.toFixed(1)}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" color="primary">
                    Book Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ============ POPULAR DESTINATIONS SECTION ============ */}
      <Box sx={{ backgroundColor: '#fff', py: 5 }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            Popular Destinations
          </Typography>
          <Grid container spacing={2}>
            {popularDestinations.map((dest) => (
              <Grid item xs={12} sm={4} key={dest.id}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 2,
                    position: 'relative',
                    height: 180,
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.6)',
                      color: '#fff',
                      py: 1,
                      px: 2,
                    }}
                  >
                    <Typography variant="h6">{dest.label}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ============ WHY CHOOSE US SECTION ============ */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Why Choose Our Service
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Best Price Guarantee</Typography>
            <Typography variant="body2" color="text.secondary">
              Get the guaranteed best price on thousands of hotels and resorts.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Top-Rated Properties</Typography>
            <Typography variant="body2" color="text.secondary">
              Stay at the finest hotels verified by real guests all over the world.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">24/7 Customer Support</Typography>
            <Typography variant="body2" color="text.secondary">
              Our dedicated support team is here to help you at any hour of the day.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* ============ TESTIMONIALS SECTION ============ */}
      <Box sx={{ backgroundColor: '#F7FAFC', py: 5 }}>
        <Container>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            What Our Customers Say
          </Typography>

          <Grid container spacing={3}>
            {/* Example testimonial */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    "I had an amazing experience booking through this platform. The
                    prices were unbeatable and the customer service was top notch!"
                  </Typography>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    - John Doe
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* More testimonials can go here... */}
          </Grid>
        </Container>
      </Box>

      {/* ============ FOOTER SECTION ============ */}
      <Box sx={{ backgroundColor: '#333', color: '#fff', py: 4 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Hotel Reservation
              </Typography>
              <Typography variant="body2" color="inherit">
                Book the best deals worldwide.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" color="inherit">
                - About Us
              </Typography>
              <Typography variant="body2" color="inherit">
                - Contact
              </Typography>
              <Typography variant="body2" color="inherit">
                - FAQ
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
                Subscribe for exclusive deals!
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  variant="filled"
                  size="small"
                  label="Email"
                  InputProps={{ style: { backgroundColor: '#fff' } }}
                />
                <Button variant="contained" color="secondary">
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
          <Typography variant="body2" color="inherit" align="center">
            &copy; {new Date().getFullYear()} Hotel Reservation System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
