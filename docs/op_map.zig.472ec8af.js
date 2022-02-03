var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Type = @import(\"../common/types/type.zig\").Type;"},
{"lineNum":"   20","line":"const TokenType = @import(\"../common/token.zig\").Token.Type;"},
{"lineNum":"   21","line":"const TypeBook = @import(\"./typebook.zig\").TypeBook;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const OpEntry = union(Variant) {"},
{"lineNum":"   24","line":"    const Variant = enum {"},
{"lineNum":"   25","line":"        Unary,"},
{"lineNum":"   26","line":"        Binary,"},
{"lineNum":"   27","line":"    };"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    // When output is null, the output type is the same as the input type"},
{"lineNum":"   30","line":"    Unary: struct {"},
{"lineNum":"   31","line":"        input: Type.Ptr,"},
{"lineNum":"   32","line":"        output: ?Type.Ptr,"},
{"lineNum":"   33","line":"    },"},
{"lineNum":"   34","line":"    Binary: struct {"},
{"lineNum":"   35","line":"        input: Type.Ptr,"},
{"lineNum":"   36","line":"        output: ?Type.Ptr,"},
{"lineNum":"   37","line":"    },"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"    pub fn getType(self: OpEntry) Variant {","class":"lineCov","hits":"1","order":"4949","possible_hits":"1",},
{"lineNum":"   40","line":"        return @as(Variant, self);","class":"lineCov","hits":"1","order":"4950","possible_hits":"1",},
{"lineNum":"   41","line":"    }"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"    pub fn un(input: Type.Ptr, output: ?Type.Ptr) OpEntry {","class":"lineCov","hits":"1","order":"1793","possible_hits":"1",},
{"lineNum":"   44","line":"        return OpEntry{","class":"lineCov","hits":"1","order":"1797","possible_hits":"1",},
{"lineNum":"   45","line":"            .Unary = .{","class":"lineCov","hits":"1","order":"1794","possible_hits":"1",},
{"lineNum":"   46","line":"                .input = input,","class":"lineCov","hits":"1","order":"1795","possible_hits":"1",},
{"lineNum":"   47","line":"                .output = output,","class":"lineCov","hits":"1","order":"1796","possible_hits":"1",},
{"lineNum":"   48","line":"            },"},
{"lineNum":"   49","line":"        };"},
{"lineNum":"   50","line":"    }"},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"    pub fn bin(input: Type.Ptr, output: ?Type.Ptr) OpEntry {","class":"lineCov","hits":"1","order":"1806","possible_hits":"1",},
{"lineNum":"   53","line":"        return OpEntry{","class":"lineCov","hits":"1","order":"1810","possible_hits":"1",},
{"lineNum":"   54","line":"            .Binary = .{","class":"lineCov","hits":"1","order":"1807","possible_hits":"1",},
{"lineNum":"   55","line":"                .input = input,","class":"lineCov","hits":"1","order":"1808","possible_hits":"1",},
{"lineNum":"   56","line":"                .output = output,","class":"lineCov","hits":"1","order":"1809","possible_hits":"1",},
{"lineNum":"   57","line":"            },"},
{"lineNum":"   58","line":"        };"},
{"lineNum":"   59","line":"    }"},
{"lineNum":"   60","line":"};"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"pub const OpMap = [std.meta.fields(TokenType).len]?OpEntry;"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"pub fn populateOpMap(b: *TypeBook) void {","class":"lineCov","hits":"2","order":"1789","possible_hits":"2",},
{"lineNum":"   65","line":"    std.mem.set(?OpEntry, b.opMap[0..], null);","class":"lineCov","hits":"1","order":"1790","possible_hits":"1",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"    const h = (struct {"},
{"lineNum":"   68","line":"        book: *TypeBook,"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"        fn put(self: @This(), op: TokenType, entry: OpEntry) void {","class":"lineCov","hits":"2","order":"1798","possible_hits":"2",},
{"lineNum":"   71","line":"            self.book.opMap[@enumToInt(op)] = entry;","class":"lineCov","hits":"1","order":"1799","possible_hits":"1",},
{"lineNum":"   72","line":"        }"},
{"lineNum":"   73","line":"    }){ .book = b };","class":"lineCov","hits":"1","order":"1791","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    h.put(.Inc, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1792","possible_hits":"1",},
{"lineNum":"   76","line":"    h.put(.Dec, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1800","possible_hits":"1",},
{"lineNum":"   77","line":"    h.put(.BitNot, OpEntry.un(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1801","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"    h.put(.LogicalNot, OpEntry.un(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1802","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    h.put(.Delete, OpEntry.un(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1803","possible_hits":"1",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    h.put(.Nullish, OpEntry.un(&b.anyTy, &b.anyTy)); // TODO: Fix output","class":"lineCov","hits":"1","order":"1804","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    h.put(.Assign, OpEntry.bin(&b.anyTy, null));","class":"lineCov","hits":"1","order":"1805","possible_hits":"1",},
{"lineNum":"   86","line":"    h.put(.NullishAssign, OpEntry.bin(&b.anyTy, &b.anyTy)); // TODO: Fix output","class":"lineCov","hits":"1","order":"1811","possible_hits":"1",},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    h.put(.TypeOf, OpEntry.un(&b.anyTy, &b.stringTy));","class":"lineCov","hits":"1","order":"1812","possible_hits":"1",},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    h.put(","class":"lineCov","hits":"1","order":"1836","possible_hits":"1",},
{"lineNum":"   91","line":"        .Add,"},
{"lineNum":"   92","line":"        OpEntry.bin(b.getUnion(&.{ &b.numberTy, &b.stringTy }), null),","class":"lineCov","hits":"1","order":"1813","possible_hits":"1",},
{"lineNum":"   93","line":"    );"},
{"lineNum":"   94","line":"    h.put(","class":"lineCov","hits":"1","order":"1842","possible_hits":"1",},
{"lineNum":"   95","line":"        .AddAssign,"},
{"lineNum":"   96","line":"        OpEntry.bin(b.getUnion(&.{ &b.numberTy, &b.stringTy }), null),","class":"lineCov","hits":"1","order":"1837","possible_hits":"1",},
{"lineNum":"   97","line":"    );"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"    h.put(.Sub, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1843","possible_hits":"1",},
{"lineNum":"  100","line":"    h.put(.Mul, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1844","possible_hits":"1",},
{"lineNum":"  101","line":"    h.put(.Pow, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1845","possible_hits":"1",},
{"lineNum":"  102","line":"    h.put(.Div, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1846","possible_hits":"1",},
{"lineNum":"  103","line":"    h.put(.Mod, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1847","possible_hits":"1",},
{"lineNum":"  104","line":"    h.put(.SubAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1848","possible_hits":"1",},
{"lineNum":"  105","line":"    h.put(.MulAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1849","possible_hits":"1",},
{"lineNum":"  106","line":"    h.put(.DivAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1850","possible_hits":"1",},
{"lineNum":"  107","line":"    h.put(.ModAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1851","possible_hits":"1",},
{"lineNum":"  108","line":"    h.put(.PowAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1852","possible_hits":"1",},
{"lineNum":"  109","line":"    h.put(.BitAndAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1853","possible_hits":"1",},
{"lineNum":"  110","line":"    h.put(.BitOrAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1854","possible_hits":"1",},
{"lineNum":"  111","line":"    h.put(.BitNotAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1855","possible_hits":"1",},
{"lineNum":"  112","line":"    h.put(.BitXorAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1856","possible_hits":"1",},
{"lineNum":"  113","line":"    h.put(.ShiftRightAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1857","possible_hits":"1",},
{"lineNum":"  114","line":"    h.put(.ShiftRightUnsignedAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1858","possible_hits":"1",},
{"lineNum":"  115","line":"    h.put(.ShiftLeftAssign, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1859","possible_hits":"1",},
{"lineNum":"  116","line":"    h.put(.BitAnd, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1860","possible_hits":"1",},
{"lineNum":"  117","line":"    h.put(.BitOr, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1861","possible_hits":"1",},
{"lineNum":"  118","line":"    h.put(.BitXor, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1862","possible_hits":"1",},
{"lineNum":"  119","line":"    h.put(.ShiftRight, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1863","possible_hits":"1",},
{"lineNum":"  120","line":"    h.put(.ShiftRightUnsigned, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1864","possible_hits":"1",},
{"lineNum":"  121","line":"    h.put(.ShiftLeft, OpEntry.bin(&b.numberTy, null));","class":"lineCov","hits":"1","order":"1865","possible_hits":"1",},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"    h.put(.CmpGreater, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1866","possible_hits":"1",},
{"lineNum":"  124","line":"    h.put(.CmpGreaterEq, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1867","possible_hits":"1",},
{"lineNum":"  125","line":"    h.put(.CmpLess, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1868","possible_hits":"1",},
{"lineNum":"  126","line":"    h.put(.CmpLessEq, OpEntry.bin(&b.numberTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1869","possible_hits":"1",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"    h.put(.CmpEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1870","possible_hits":"1",},
{"lineNum":"  129","line":"    h.put(.CmpStrictEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1871","possible_hits":"1",},
{"lineNum":"  130","line":"    h.put(.CmpNotEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1872","possible_hits":"1",},
{"lineNum":"  131","line":"    h.put(.CmpStrictNotEq, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1873","possible_hits":"1",},
{"lineNum":"  132","line":"    h.put(.LogicalAnd, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1874","possible_hits":"1",},
{"lineNum":"  133","line":"    h.put(.LogicalOr, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1875","possible_hits":"1",},
{"lineNum":"  134","line":"    h.put(.LogicalAndAssign, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1876","possible_hits":"1",},
{"lineNum":"  135","line":"    h.put(.LogicalOrAssign, OpEntry.bin(&b.anyTy, &b.booleanTy));","class":"lineCov","hits":"1","order":"1877","possible_hits":"1",},
{"lineNum":"  136","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-03 21:04:56", "instrumented" : 65, "covered" : 65,};
var merged_data = [];
