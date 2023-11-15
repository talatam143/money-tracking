import { Accordion, AccordionDetails, AccordionSummary, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BankIcon, CreditCardIcon, EditButton, PayPalIcon } from '../../Assets/Icons/Icons';
import { useSelector } from 'react-redux';

const MuiAccordin = (props) => {
  const { category, accordinState, handleAccordinChange, handleAccordinEdit, data } = props;
  const appColorTheme = useSelector((state) => state.colorState);

  return (
    <Accordion
      sx={{ background: 'transparent' }}
      expanded={accordinState === category}
      onChange={handleAccordinChange(category)}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: '30px',
              fill: appColorTheme.name === 'Dark theme' ? '#FFFFFF' : null,
            }}
          />
        }
        aria-controls={category}
        id={category}
        sx={{ height: '7px' }}
      >
        <div className='accordinDetailsHeadingContainer'>
          {category === 'bankDetails' ? (
            <BankIcon />
          ) : category === 'creditCardsDetails' ? (
            <CreditCardIcon />
          ) : (
            <PayPalIcon />
          )}
          <span className='accordinDetailsHeadingSpan'>
            {category === 'bankDetails'
              ? 'Bank'
              : category === 'creditCardsDetails'
              ? 'Credit Card'
              : 'UPI'}
          </span>
          {accordinState === category ? (
            <button
              className='accordingEditButton'
              onClick={(e) => handleAccordinEdit(e, category)}
            >
              <EditButton />
            </button>
          ) : null}
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <div className='accordinCardsContainer'>
          {data?.map((eadhData) => (
            <Paper
              elevation={2}
              sx={{ borderRadius: '15px', background: appColorTheme.backgroundColor }}
              key={eadhData.name}
              className={
                category === 'bankDetails' || category === 'creditCardsDetails'
                  ? 'accordinMaxcards'
                  : 'accordinMinicards'
              }
            >
              <img
                src={eadhData.imageUrl}
                alt='according-card-logo'
                style={{
                  width: eadhData.noImage
                    ? '60px'
                    : category === 'bankDetails' || category === 'creditCardsDetails'
                    ? '130px'
                    : '80px',
                  borderRadius: category === 'upiDetails' ? '15px' : 'none',
                }}
              />
              <p className='accordingCardName'>{eadhData.name}</p>
            </Paper>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default MuiAccordin;
