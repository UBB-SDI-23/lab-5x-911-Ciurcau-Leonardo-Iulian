#define _CRT_SECURE_NO_WARNINGS
#define generateId(id, i, j, maxJ) (id) = (i) * (maxJ) + (j) + (1)
#define sizeofMatrix(m) (sizeof((m)) / sizeof((m[0])))
#ifdef _WIN32
#pragma warning( disable : 4996)
#define itoa _itoa
#endif

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

void generateBirthDate(char* birthDate, char* day, char* month, char* year);
void generatetelephoneNumber(char* telephoneNumber);
void generateAddress(char* address, int citiesSize, char* cities[], int streetsSize, char* streets[]);
void generateName(char* name, int firstNameSize, char* firstName[], int lastNameSize, char* lastName[]);
void generateEmail(char* email, char* name, int emailProvidersSize, char* emailProviders[]);

int main()
{
	srand(time(NULL));

	char* cities[] = {
		"New York", "Los Angeles", "Washington", "Boston", "Detroit", "Miami",
		"Chicago", "San Francisco", "Seattle", "Houston", "Dallas", "Atlanta",
		"Philadelphia", "Denver", "San Diego", "Phoenix", "Las Vegas", "New Orleans",
		"Portland", "Nashville", "Minneapolis", "Charlotte", "Indianapolis", "Kansas City",
		"Cleveland", "Memphis", "St. Louis", "Baltimore", "Salt Lake City", "Austin",
		"San Antonio", "Orlando", "Tampa", "Sacramento", "Charlotte", "Columbus",
		"Pittsburgh", "Oakland", "Albuquerque", "Omaha", "Honolulu", "Madison"
	};

	char* streets[] = {
		"Main Street", "Broadway", "Wall Street", "Fifth Avenue", "Rodeo Drive", "Hollywood Boulevard",
		"Michigan Avenue", "Lombard Street", "Pike Place", "Beale Street", "Greenville Avenue", "Peachtree Street",
		"South Street", "Larimer Square", "Gaslamp Quarter", "Camelback Road", "The Strip", "Bourbon Street",
		"Hawthorne Boulevard", "Broadway", "Hennepin Avenue", "Trade Street", "Meridian Street", "Grand Boulevard",
		"Euclid Avenue", "Beale Street", "The Delmar Loop", "Charles Street", "Main Street", "Sixth Street",
		"State Street", "Sunset Boulevard", "Collins Avenue", "Pennsylvania Avenue", "Rush Street", "Pico Boulevard",
		"Market Street", "Elm Street", "Canal Street", "Church Street", "Santa Monica Boulevard", "Haight Street"
	};

	char* firstName[] = {
		"Emily", "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Mia", "Charlotte", "Amelia", "Harper",
		"Evelyn", "Abigail", "Ella", "Elizabeth", "Sofia", "Madison", "Avery", "Mila", "Aria", "Scarlett",
		"Grace", "Chloe", "Victoria", "Riley", "Aubrey", "Zoey", "Lily", "Hannah", "Samantha", "Layla",
		"Daniel", "David", "William", "Mason", "Ethan", "Michael", "Jacob", "Noah", "Liam", "Oliver",
		"Alexander", "Lucas", "Benjamin", "Elijah", "James", "Logan", "Aiden", "Caleb", "Caden", "Jackson",
		"Gabriel", "Nicholas", "John", "Samuel", "Matthew", "Luke", "Joseph", "Andrew", "Owen", "Max"
	};

	char* lastName[] = {
		"Smith", "Johnson", "Williams", "Jones", "Brown", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
		"Hernandez", "Lopez", "Gonzalez", "Perez", "Jackson", "Harris", "Clark", "Lewis", "Allen", "Young",
		"Walker", "Hall", "Green", "Baker", "Adams", "Nelson", "Carter", "Mitchell", "Parker", "Collins",
		"King", "Scott", "Wright", "Lee", "Turner", "Campbell", "Gomez", "Reed", "Phillips", "Morgan",
		"Cooper", "Peterson", "Perry", "Powell", "Long", "Bryant", "James", "Watson", "Evans", "Foster",
		"Gordon", "Ramos", "Washington", "Butler", "Simmons", "Frazier", "Murray", "Sanders", "Webb", "Hunter"
	};

	char* emailProviders[] = {
		"gmail.com", "yahoo.com", "outlook.com", "hotmail.com"
	};


	int inserts_no = 10;
	int batches_no = 10;

	int id = 0;
	char address[256] = { 0 };
	char day[3] = { 0 };
	char month[3] = { 0 };
	char year[5] = { 0 };
	char birthDate[11] = { 0 };
	char email[65] = { 0 };
	char name[65] = { 0 };
	char telephoneNumber[11] = { 0 };

	FILE* f;

	f = fopen("generate_clients.sql", "w");

	for (int i = 0; i < inserts_no; i++)
	{	
		fprintf(f, "INSERT INTO client(id,address,birth_date,email,name,telephone_Size) VALUES ");
		for (int j = 0; j < batches_no; j++)
		{
			generateId(id, i, j, batches_no);
			generateAddress(address, sizeofMatrix(cities), cities, sizeofMatrix(streets), streets);
			generateBirthDate(birthDate, day, month, year);
			generateName(name, sizeofMatrix(firstName), firstName, sizeofMatrix(lastName), lastName);
			generateEmail(email, name, sizeofMatrix(emailProviders), emailProviders);
			generatetelephoneNumber(telephoneNumber);

			fprintf(
				f, 
				"(%d,'%s','%s','%s','%s','%s')",
				id, address, birthDate, email, name, telephoneNumber
			);
			fprintf(f, j < batches_no - 1 ? "," : ";\n");
		}
	}

	fclose(f);
	return 0;
}


void generateBirthDate(char* birthDate, char* day, char* month, char* year)
{
	itoa(rand() % 28 + 1, day, 10);
	if (!day[1])
		day[1] = day[0], day[0] = '0', day[2] = '\0';
	itoa(rand() % 12 + 1, month, 10);
	if (!month[1])
		month[1] = month[0], month[0] = '0', month[2] = '\0';
	itoa(rand() % 45 + 1960, year, 10);
	strcpy(birthDate, day);
	strcat(birthDate, "-");
	strcat(birthDate, month);
	strcat(birthDate, "-");
	strcat(birthDate, year);
}

void generatetelephoneNumber(char* telephoneNumber)
{
	strcpy(telephoneNumber, "07");
	for (int index = 2; index < 10; index++)
		telephoneNumber[index] = (rand() % 10) + '0';
}

void generateAddress(char* address, int citiesSize, char* cities[], int streetsSize, char* streets[])
{
	strcpy(address, cities[rand() % citiesSize]);
	strcat(address, ", ");
	strcat(address, streets[rand() % streetsSize]);
	strcat(address, " ");
	itoa(rand() % 200 + 1, address + strlen(address), 10);
}

void generateName(char* name, int firstNameSize, char* firstName[], int lastNameSize, char* lastName[])
{
	strcpy(name, firstName[rand() % firstNameSize]);
	strcat(name, " ");
	strcat(name, lastName[rand() % lastNameSize]);
}

void generateEmail(char* email, char* name, int emailProvidersSize, char* emailProviders[])
{
	while (*name)
	{
		if (*name >= 'A' && *name <= 'Z')
			*email = (*name - 'A') + 'a', email++;
		else if (*name != ' ')
			*email = *name, email++;
		name++;
	}
	*email = '@';
	email++;
	*email = '\0';
	strcat(email, emailProviders[rand() % emailProvidersSize]);
}