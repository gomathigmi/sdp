import { Box, Image, Text } from "@chakra-ui/react"

function PageNotFound() {
  return (
    <>
    <Box className="flex justify-center">
        <Image src="/Svg/undraw_page_not_found_re_e9o6.svg"/>

    </Box> 
       
        <Text className="flex justify-center mt-3 font-pbold">Page Not Found</Text>
    </>
  )
}

export default PageNotFound