import React,{useEffect,useState} from 'react'
import  Pagination from '@mui/material/Pagination';
import {Box,Stack,Typography} from "@mui/material"
import ExerciseCards from './ExerciseCards';
import { exerciseOptions,fetchData } from '../utils/fetchData';
const Exercises = ({exercises,setExercises,bodyPart}) => {
  const[currentPage,setCurrentPage]=useState(1);
  const exercisePerPage=9;
  const indexOfLastExercise=currentPage*exercisePerPage;
  const indexOfFirstExercise=indexOfLastExercise-exercisePerPage;
  const currExercises=exercises.slice(indexOfFirstExercise,indexOfLastExercise)
  const pageinate=(e,value)=>{
    setCurrentPage(value);
    window.scrollTo({top:1800, behavior:"smooth"})

  }
  useEffect(()=>{
    const fetchExercisesData=async()=>{
      let exerciseData=[];
      if(bodyPart==='all'){
        exerciseData=await fetchData('https://exercisedb.p.rapidapi.com/exercises?offset=0&limit=1300',exerciseOptions);
      }
      else{
        exerciseData=await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,exerciseOptions);
      }
      setExercises(exerciseData);
    }
    fetchExercisesData();
  },[bodyPart]);
  return (
    <Box id="exercises"
    sx={{
      mt:{lg:'110px'}
    }}
    mt="50px"
    p="20px"
    >
      <Typography variant='h3' mb="46px" >Show Results</Typography>
      <Stack direction="row" sx={{gap:{lg:'110px',xs:'50px'}}}
      flexWrap="wrap" justifyContent="center">
        {
          currExercises.map((exercise,index)=>(
           <ExerciseCards key={index} exercise={exercise}/>))}
      </Stack>
      <Stack mt="100px" alignItems="center">
            {exercises.length>9 && (
              <Pagination 
              color='standard'
              shape='rounded'
              defaultPage={1}
              count={Math.ceil(exercises.length/exercisePerPage)}
              page={currentPage}
              onChange={pageinate}
              size='large'
              />

              
            )}
      </Stack>

    </Box>
  )
}

export default Exercises