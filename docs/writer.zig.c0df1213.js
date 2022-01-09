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
{"lineNum":"   19","line":"const expectEqual = std.testing.expectEqual;"},
{"lineNum":"   20","line":"const expectEqualStrings = std.testing.expectEqualStrings;"},
{"lineNum":"   21","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"pub const WriteContextOpts = struct {"},
{"lineNum":"   24","line":"    pageSize: usize = 4096,"},
{"lineNum":"   25","line":"};"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"pub fn WriteContext(comptime opts: WriteContextOpts) type {"},
{"lineNum":"   28","line":"    return struct {"},
{"lineNum":"   29","line":"        const This = @This();"},
{"lineNum":"   30","line":"        pub const Writer = std.io.Writer(*This, Error, This.write);"},
{"lineNum":"   31","line":"        const Error = anyerror;"},
{"lineNum":"   32","line":"        const PageList = std.ArrayList([]u8);"},
{"lineNum":"   33","line":"        const pageSize = opts.pageSize;"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"        alloc: Allocator,"},
{"lineNum":"   36","line":"        list: PageList,"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"        pub fn new(alloc: Allocator) !*This {","class":"lineCov","hits":"3","order":"65","possible_hits":"3",},
{"lineNum":"   39","line":"            // We allocate this on the heap as we need a stable pointer to"},
{"lineNum":"   40","line":"            // create the std.io.Writer instance"},
{"lineNum":"   41","line":"            var self = try alloc.create(This);","class":"lineCov","hits":"3","order":"66","possible_hits":"3",},
{"lineNum":"   42","line":"            self.alloc = alloc;","class":"lineCov","hits":"3","order":"67","possible_hits":"3",},
{"lineNum":"   43","line":"            self.list = PageList.init(alloc);","class":"lineCov","hits":"3","order":"68","possible_hits":"3",},
{"lineNum":"   44","line":"            try self.allocNewPage();","class":"lineCov","hits":"3","order":"69","possible_hits":"3",},
{"lineNum":"   45","line":"            return self;","class":"lineCov","hits":"3","order":"74","possible_hits":"3",},
{"lineNum":"   46","line":"        }"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"        pub fn deinit(self: *This) void {","class":"lineCov","hits":"6","order":"124","possible_hits":"6",},
{"lineNum":"   49","line":"            for (self.list.items) |*page| {","class":"lineCov","hits":"6","order":"125","possible_hits":"6",},
{"lineNum":"   50","line":"                page.len = pageSize;","class":"lineCov","hits":"3","order":"126","possible_hits":"3",},
{"lineNum":"   51","line":"                self.alloc.free(page.*);","class":"lineCov","hits":"3","order":"127","possible_hits":"3",},
{"lineNum":"   52","line":"            }"},
{"lineNum":"   53","line":"            self.list.deinit();","class":"lineCov","hits":"3","order":"128","possible_hits":"3",},
{"lineNum":"   54","line":"            self.alloc.destroy(self);","class":"lineCov","hits":"3","order":"129","possible_hits":"3",},
{"lineNum":"   55","line":"        }"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"        pub fn getPageSize(self: This) usize {","class":"lineCov","hits":"3","order":"2034","possible_hits":"3",},
{"lineNum":"   58","line":"            _ = self;"},
{"lineNum":"   59","line":"            return pageSize;","class":"lineCov","hits":"3","order":"2035","possible_hits":"3",},
{"lineNum":"   60","line":"        }"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"        pub fn toString(self: This) ![]u8 {","class":"lineCov","hits":"3","order":"105","possible_hits":"3",},
{"lineNum":"   63","line":"            var bytes: usize = 0;","class":"lineCov","hits":"3","order":"106","possible_hits":"3",},
{"lineNum":"   64","line":"            for (self.list.items) |page|","class":"lineCov","hits":"6","order":"107","possible_hits":"6",},
{"lineNum":"   65","line":"                bytes += page.len;","class":"linePartCov","hits":"3","order":"108","possible_hits":"6",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"            var str = try self.alloc.alloc(u8, bytes);","class":"lineCov","hits":"3","order":"109","possible_hits":"3",},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"            bytes = 0;","class":"lineCov","hits":"3","order":"110","possible_hits":"3",},
{"lineNum":"   70","line":"            for (self.list.items) |page| {","class":"lineCov","hits":"6","order":"111","possible_hits":"6",},
{"lineNum":"   71","line":"                std.mem.copy(u8, str[bytes..], page);","class":"linePartCov","hits":"3","order":"112","possible_hits":"6",},
{"lineNum":"   72","line":"                bytes += page.len;","class":"lineCov","hits":"3","order":"113","possible_hits":"3",},
{"lineNum":"   73","line":"            }"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"            return str;","class":"lineCov","hits":"3","order":"114","possible_hits":"3",},
{"lineNum":"   76","line":"        }"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"        pub fn freeString(self: This, str: []u8) void {","class":"lineCov","hits":"6","order":"119","possible_hits":"6",},
{"lineNum":"   79","line":"            self.alloc.free(str);","class":"lineCov","hits":"3","order":"120","possible_hits":"3",},
{"lineNum":"   80","line":"        }"},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        pub fn writer(self: *This) Writer {","class":"lineCov","hits":"3","order":"81","possible_hits":"3",},
{"lineNum":"   83","line":"            return Writer{","class":"lineCov","hits":"3","order":"83","possible_hits":"3",},
{"lineNum":"   84","line":"                .context = self,","class":"lineCov","hits":"3","order":"82","possible_hits":"3",},
{"lineNum":"   85","line":"            };"},
{"lineNum":"   86","line":"        }"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"        fn write(self: *This, bytes: []const u8) Error!usize {","class":"lineCov","hits":"3","order":"92","possible_hits":"3",},
{"lineNum":"   89","line":"            std.debug.assert(self.list.items.len > 0);","class":"lineCov","hits":"3","order":"93","possible_hits":"3",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"            if (bytes.len > pageSize) {","class":"linePartCov","hits":"4","order":"94","possible_hits":"6",},
{"lineNum":"   92","line":"                var written: usize = 0;","class":"linePartCov","hits":"1","order":"2070","possible_hits":"3",},
{"lineNum":"   93","line":"                while (written < bytes.len) {","class":"linePartCov","hits":"2","order":"2071","possible_hits":"6",},
{"lineNum":"   94","line":"                    const end = std.math.min(written + pageSize, bytes.len);","class":"linePartCov","hits":"1","order":"2072","possible_hits":"6",},
{"lineNum":"   95","line":"                    written += try self.write(bytes[written..end]);","class":"linePartCov","hits":"1","order":"2073","possible_hits":"6",},
{"lineNum":"   96","line":"                }"},
{"lineNum":"   97","line":"            } else {"},
{"lineNum":"   98","line":"                @setRuntimeSafety(false);"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"                var idx = self.list.items.len - 1;","class":"lineCov","hits":"3","order":"95","possible_hits":"3",},
{"lineNum":"  101","line":"                var cur = self.list.items[idx];","class":"lineCov","hits":"3","order":"96","possible_hits":"3",},
{"lineNum":"  102","line":"                if (cur.len + bytes.len < pageSize) {","class":"linePartCov","hits":"8","order":"97","possible_hits":"9",},
{"lineNum":"  103","line":"                    const end = cur.len + bytes.len;","class":"lineCov","hits":"3","order":"98","possible_hits":"3",},
{"lineNum":"  104","line":"                    std.mem.copy(u8, cur[cur.len..end], bytes);","class":"lineCov","hits":"3","order":"99","possible_hits":"3",},
{"lineNum":"  105","line":"                    self.list.items[idx].len += bytes.len;","class":"lineCov","hits":"3","order":"100","possible_hits":"3",},
{"lineNum":"  106","line":"                } else {"},
{"lineNum":"  107","line":"                    const toWrite = pageSize - cur.len;","class":"linePartCov","hits":"2","order":"2049","possible_hits":"3",},
{"lineNum":"  108","line":"                    std.mem.copy(","class":"linePartCov","hits":"2","order":"2052","possible_hits":"3",},
{"lineNum":"  109","line":"                        u8,"},
{"lineNum":"  110","line":"                        cur[cur.len..pageSize],","class":"linePartCov","hits":"2","order":"2050","possible_hits":"3",},
{"lineNum":"  111","line":"                        bytes[0..toWrite],","class":"linePartCov","hits":"2","order":"2051","possible_hits":"3",},
{"lineNum":"  112","line":"                    );"},
{"lineNum":"  113","line":"                    self.list.items[idx].len = pageSize;","class":"linePartCov","hits":"2","order":"2053","possible_hits":"3",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"                    try self.allocNewPage();","class":"linePartCov","hits":"2","order":"2054","possible_hits":"3",},
{"lineNum":"  116","line":"                    idx = self.list.items.len - 1;","class":"linePartCov","hits":"2","order":"2055","possible_hits":"3",},
{"lineNum":"  117","line":"                    cur = self.list.items[idx];","class":"linePartCov","hits":"2","order":"2056","possible_hits":"3",},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"                    const len = bytes.len - toWrite;","class":"linePartCov","hits":"2","order":"2057","possible_hits":"3",},
{"lineNum":"  120","line":"                    std.mem.copy(u8, cur[0..len], bytes[toWrite..]);","class":"linePartCov","hits":"2","order":"2058","possible_hits":"3",},
{"lineNum":"  121","line":"                    self.list.items[idx].len = len;","class":"linePartCov","hits":"2","order":"2059","possible_hits":"3",},
{"lineNum":"  122","line":"                }"},
{"lineNum":"  123","line":"            }"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"            return bytes.len;","class":"lineCov","hits":"3","order":"101","possible_hits":"3",},
{"lineNum":"  126","line":"        }"},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"        fn allocNewPage(self: *This) !void {","class":"lineCov","hits":"6","order":"70","possible_hits":"6",},
{"lineNum":"  129","line":"            var page = try self.alloc.alloc(u8, pageSize);","class":"lineCov","hits":"3","order":"71","possible_hits":"3",},
{"lineNum":"  130","line":"            page.len = 0;","class":"lineCov","hits":"3","order":"72","possible_hits":"3",},
{"lineNum":"  131","line":"            try self.list.append(page);","class":"lineCov","hits":"3","order":"73","possible_hits":"3",},
{"lineNum":"  132","line":"        }"},
{"lineNum":"  133","line":"    };"},
{"lineNum":"  134","line":"}"},
{"lineNum":"  135","line":""},
{"lineNum":"  136","line":"test \"can write to Writer\" {","class":"lineCov","hits":"3","order":"2031","possible_hits":"3",},
{"lineNum":"  137","line":"    var writeCtx = try WriteContext(.{}).new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2032","possible_hits":"1",},
{"lineNum":"  138","line":"    defer writeCtx.deinit();","class":"linePartCov","hits":"1","order":"2041","possible_hits":"5",},
{"lineNum":"  139","line":"    try expectEqual(@intCast(usize, 4096), writeCtx.getPageSize());","class":"linePartCov","hits":"1","order":"2033","possible_hits":"2",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"    var writer = writeCtx.writer();","class":"lineCov","hits":"1","order":"2036","possible_hits":"1",},
{"lineNum":"  142","line":"    try writer.print(\"hello world\", .{});","class":"linePartCov","hits":"1","order":"2037","possible_hits":"2",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"    var str = try writeCtx.toString();","class":"linePartCov","hits":"1","order":"2038","possible_hits":"2",},
{"lineNum":"  145","line":"    defer writeCtx.freeString(str);","class":"linePartCov","hits":"1","order":"2040","possible_hits":"2",},
{"lineNum":"  146","line":"    try expectEqualStrings(\"hello world\", str);","class":"linePartCov","hits":"1","order":"2039","possible_hits":"2",},
{"lineNum":"  147","line":"}"},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"test \"can write to Writer across a page boundary\" {","class":"lineCov","hits":"3","order":"2042","possible_hits":"3",},
{"lineNum":"  150","line":"    var writeCtx = try WriteContext(.{","class":"lineCov","hits":"1","order":"2044","possible_hits":"1",},
{"lineNum":"  151","line":"        .pageSize = 8,"},
{"lineNum":"  152","line":"    }).new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2043","possible_hits":"1",},
{"lineNum":"  153","line":"    defer writeCtx.deinit();","class":"linePartCov","hits":"1","order":"2063","possible_hits":"6",},
{"lineNum":"  154","line":"    try expectEqual(@intCast(usize, 8), writeCtx.getPageSize());","class":"linePartCov","hits":"1","order":"2045","possible_hits":"2",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"    var writer = writeCtx.writer();","class":"lineCov","hits":"1","order":"2046","possible_hits":"1",},
{"lineNum":"  157","line":"    try writer.print(\"hello\", .{});","class":"linePartCov","hits":"1","order":"2047","possible_hits":"2",},
{"lineNum":"  158","line":"    try writer.print(\" world\", .{});","class":"linePartCov","hits":"1","order":"2048","possible_hits":"2",},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"    var str = try writeCtx.toString();","class":"linePartCov","hits":"1","order":"2060","possible_hits":"2",},
{"lineNum":"  161","line":"    defer writeCtx.freeString(str);","class":"linePartCov","hits":"1","order":"2062","possible_hits":"2",},
{"lineNum":"  162","line":"    try expectEqualStrings(\"hello world\", str);","class":"linePartCov","hits":"1","order":"2061","possible_hits":"2",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"test \"can write to Writer with a string larger than the page size\" {","class":"lineCov","hits":"3","order":"2064","possible_hits":"3",},
{"lineNum":"  166","line":"    var writeCtx = try WriteContext(.{","class":"lineCov","hits":"1","order":"2066","possible_hits":"1",},
{"lineNum":"  167","line":"        .pageSize = 4,"},
{"lineNum":"  168","line":"    }).new(std.testing.allocator);","class":"lineCov","hits":"1","order":"2065","possible_hits":"1",},
{"lineNum":"  169","line":"    defer writeCtx.deinit();","class":"linePartCov","hits":"1","order":"2077","possible_hits":"5",},
{"lineNum":"  170","line":"    try expectEqual(@intCast(usize, 4), writeCtx.getPageSize());","class":"linePartCov","hits":"1","order":"2067","possible_hits":"2",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    var writer = writeCtx.writer();","class":"lineCov","hits":"1","order":"2068","possible_hits":"1",},
{"lineNum":"  173","line":"    try writer.print(\"hello world\", .{});","class":"linePartCov","hits":"1","order":"2069","possible_hits":"2",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"    var str = try writeCtx.toString();","class":"linePartCov","hits":"1","order":"2074","possible_hits":"2",},
{"lineNum":"  176","line":"    defer writeCtx.freeString(str);","class":"linePartCov","hits":"1","order":"2076","possible_hits":"2",},
{"lineNum":"  177","line":"    try expectEqualStrings(\"hello world\", str);","class":"linePartCov","hits":"1","order":"2075","possible_hits":"2",},
{"lineNum":"  178","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-01-09 12:39:00", "instrumented" : 88, "covered" : 88,};
var merged_data = [];
